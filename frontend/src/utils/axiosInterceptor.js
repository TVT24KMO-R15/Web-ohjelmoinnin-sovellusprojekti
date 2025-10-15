import axios from 'axios'

let isRefreshing = false
let failedQueue = []
let userSetter = null

// create a queue for requests that fail while token is being refreshed
const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })
  failedQueue = []
}

// token interceptor setup
const createInterceptor = (axiosObj) => {
  return axiosObj.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config

      // error is 401 and havent tried tried to refresh yet
      if (error.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          // if refreshing, queue the request
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject })
          })
            // once token refreshed, retry the request
            .then(token => {
              originalRequest.headers['Authorization'] = `Bearer ${token}`
              return axiosObj(originalRequest)
            })
            .catch(err => Promise.reject(err))
        }

        originalRequest._retry = true
        isRefreshing = true

        try {
          // call token refresh endpoint
          const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/refresh`,
            {}, // no body
            { withCredentials: true }
          )

          // take new access token from header
          const authHeader = response.headers['authorization'] || response.headers['Authorization']
          let newToken = null
          if (authHeader && authHeader.startsWith('Bearer ')) {
            newToken = authHeader.substring(7)
          }

          if (newToken) {
            // update user with new token
            const storedUser = JSON.parse(sessionStorage.getItem('user') || '{}')
            const updatedUser = { ...storedUser, token: newToken }
            sessionStorage.setItem('user', JSON.stringify(updatedUser))
            
            if (userSetter) {
              userSetter(updatedUser)
            }

            // update original request and retry
            originalRequest.headers['Authorization'] = `Bearer ${newToken}`
            
            processQueue(null, newToken)
            return axiosObj(originalRequest)
          }
        } catch (refreshError) {
          processQueue(refreshError, null)
          
          // if token refresh fails, logout user
          sessionStorage.removeItem('user')
          if (userSetter) {
            userSetter({ username: "", email: "", password: "" })
          }
          window.location.href = '/'
          return Promise.reject(refreshError)
        } finally {
          isRefreshing = false
        }
      }

      return Promise.reject(error)
    }
  )
}

export const setupAxiosInterceptors = (setUser) => {
  userSetter = setUser
  createInterceptor(axios)
}
