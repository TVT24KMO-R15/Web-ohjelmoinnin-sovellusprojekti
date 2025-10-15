import { useState, useEffect } from "react";
import { UserContext } from "./UserContext";
import axios from "axios";
import { setupAxiosInterceptors } from "../utils/axiosInterceptor";

export default function UserProvider({ children }) {
  // Load user from session storage or initialize empty
  const userFromStorage = sessionStorage.getItem("user");
  const [user, setUser] = useState(
    userFromStorage
      ? JSON.parse(userFromStorage)
      : { username: "", email: "", password: "" } 
  );  
  const headers = { headers: { "Content-Type": "application/json" }, withCredentials: true };

  useEffect(() => {
    setupAxiosInterceptors(setUser);
  }, []);

 /* Sign up  */
  const signUp = async (newUser) => {
    await axios.post(
      `${import.meta.env.VITE_API_URL}/users/register`,
      { account: newUser }, 
      headers
    );

    // ensure state change on signing up
    setUser(_prev => ({ username: "", email: "", password: "" }));
  };

/* Sign in */
  const signIn = async (loginUser) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/users/signin`,
      { account: loginUser }, 
      headers
    );

    // get token from header
    const authHeader = response.headers['authorization'] || response.headers['Authorization'];
    let token = null;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    }

    // create user data object with token and timestamp to FORCE re-render on logging in (bug fix or bug workaround with new tokens)
    const userData = { 
      ...response.data, 
      token,
      _loginTimestamp: Date.now()
    };

    /* Store user in context and session storage */
    sessionStorage.setItem("user", JSON.stringify(userData));
    setUser(_prev => { return { ...userData }; }); // ensure state change on signing in
  };

  /* Sign out */
  const signOut = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/users/logout`,
        {},
        { withCredentials: true }
      );
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      sessionStorage.removeItem("user");
      setUser(_prev => ({ username: "", email: "", password: "" }));
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, signUp, signIn, signOut }}>
      {children}
    </UserContext.Provider>
  );
}
