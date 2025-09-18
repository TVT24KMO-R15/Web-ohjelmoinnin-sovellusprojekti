import { useState } from "react";
import { UserContext } from "./UserContext";
import axios from "axios";

export default function UserProvider({ children }) {
  // Load user from session storage or initialize empty
  const userFromStorage = sessionStorage.getItem("user");
  const [user, setUser] = useState(
    userFromStorage
      ? JSON.parse(userFromStorage)
      : { username: "", email: "", password: "" } 
  );  
  const headers = { headers: { "Content-Type": "application/json" } };

 /* Sign up  */
  const signUp = async (newUser) => {
    await axios.post(
      `${import.meta.env.VITE_API_URL}/users/register`,
      { account: newUser }, 
      headers
    );

    setUser({ username: "", email: "", password: "" });
  };

/* Sign in */
  const signIn = async (loginUser) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/users/signin`,
      { account: loginUser }, 
      headers
    );

    /* Store user in context and session storage */
    setUser(response.data);
    sessionStorage.setItem("user", JSON.stringify(response.data));
  };

  return (
    <UserContext.Provider value={{ user, setUser, signUp, signIn }}>
      {children}
    </UserContext.Provider>
  );
}
