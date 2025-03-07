import { useEffect, useState } from "react"
import authService from "../services/authService"
import { LoginDto } from "../helpers/apiResponseTypes"
// import { redirect } from "react-router-dom"

const useLogin = (user: LoginDto) => {

    const [loggedIn, setLoggedIn] = useState(false)

    useEffect(() => {
        const login = async () => {
            await authService.login(user).then((res) => {
                if (res.status === 200) {
                    localStorage.setItem('token', res.data.token)
                    localStorage.setItem('user', res.data.username)
                    setLoggedIn(true)
                }
            }).catch((e) => {
                // TODO error handling
            })
        }
        login()
    }, [])

    return loggedIn
}

export default useLogin
