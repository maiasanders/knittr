import { useEffect } from "react";
import { Auth } from "../helpers/apiResponseTypes";

const useLocalStorage = ({ auth }: { auth: Auth }) => {
    useEffect(() => {
        localStorage.setItem('token', auth.token);
        localStorage.setItem('user', auth.username)
    })
}
