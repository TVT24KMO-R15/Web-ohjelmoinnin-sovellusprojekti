import { useContext } from "react";
import { UserContext } from "./UserContext";
export const useUser = () => {
return useContext(UserContext)
}