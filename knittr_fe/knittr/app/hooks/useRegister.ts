import { useEffect, useState } from "react"
import { Auth } from "../helpers/apiResponseTypes"
import authService from "../services/authService"

// TODO should be able to delete
const useRegister = (user: { username: string, password: string }) => {
    const [auth, setAuth] = useState<Auth>({
        username: '',
        token: ''
    })

    useEffect(() => {
        const register = async () => {
            await authService.register(user).then((res) => {
                if (res.status === 201) {
                    setAuth(res.data)
                    localStorage.setItem('user', res.data.username)
                    localStorage.setItem('token', res.data.token)
                }
            })
        }
        register()
    }, [])
    return { auth, setAuth }

}

export { useRegister }
