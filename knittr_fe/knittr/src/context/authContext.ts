import { createContext } from "react";
import { Auth } from "../helpers/apiResponseTypes";

export const AuthContext = createContext<Auth>({
    userId: 0,
    username: '',
    token: ''
})
