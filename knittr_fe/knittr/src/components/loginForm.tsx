import { useState } from "react"
import { Auth, LoginDto } from "../helpers/apiResponseTypes";
import authService from "../services/authService";
import { AuthContext } from "../context/authContext";

const LoginForm = () => {
    const [username, setUsername] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [response, setResponse] = useState<Auth>({ userId: 0, username: '', token: '' });

    const [errors, setErrors] = useState({ username: '', password: '' })


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!username || !password) {
            // TODO error handling
        } else {
            // TODO should I refactor to external hook?
            const user: LoginDto = {
                username,
                password
            }
            authService.login(user)
                .then((res) => {
                    setResponse(res.data);
                })
        }

    }

    return (
        <AuthContext.Provider value={response}>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    name="username"
                    id="username"
                    value={username}
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                />
                <button type="submit">Sign in</button>
            </form>
        </AuthContext.Provider>
    )
}

export default LoginForm
