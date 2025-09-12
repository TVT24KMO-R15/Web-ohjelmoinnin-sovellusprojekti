import './Authentication.css'
export default function Authentication({ onClose, authenticationMode }) {  
  const { user, setUser, signUp, signIn } = useUser()
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    const signFunction = authenticationMode === AuthenticationMode.SignUp ? signUp : signIn
    signFunction().then(() => {
      navigate(authenticationMode === AuthenticationMode.SignUp ? '/signin' : '/')
    })
    .catch(error => {
      alert(error)
    })
  }
  return (
    <div className="signin open">
<div><button onClick={onClose} className="close-signin-btn">
  <svg xmlns="http://www.w3.org/2000/svg" className="close-btn" height="24px" viewBox="0 -960 960 960" width="24px" fill="#333"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
</button></div>
      <h3>{authenticationMode === AuthenticationMode.SignIn ? 'Sign in' : 'Sign up'}</h3>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input 
        type="text"
        value = {userInfo.email}
        onChange={e => setUser({...user, email: e.target.value})}
          />
         <label>Password</label>
        <input
          placeholder='Password'
          type='password'
          value={user.password}
          onChange={e => setUser({...user, password: e.target.value})}
        />
        <button type='submit'>{authenticationMode === AuthenticationMode.SignIn ? 'Login' : 'Submit'}</button>
        <Link to={authenticationMode === AuthenticationMode.SignIn ? '/signup' : '/signin'}>
          {authenticationMode === AuthenticationMode.SignIn ? 'No account? Sign up' : 'Already signed up? Sign in'}
        </Link>
      </form>
    </div>
  );
}