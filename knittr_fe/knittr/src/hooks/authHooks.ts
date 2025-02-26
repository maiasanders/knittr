import { useEffect, useState } from "react"
import { Auth } from "../helpers/apiResponseTypes"
import authService from "../services/authService"

const useRegister = (user: { username: string, password: string }) => {
    const [auth, setAuth] = useState<Auth>({
        userId: 0,
        username: '',
        token: ''
    })

    useEffect(() => {
        const register = async () => {
            await authService.register(user).then(res => setAuth(res.data))
        }
        register()
    })
    return { auth, setAuth }

}

export { useRegister }
