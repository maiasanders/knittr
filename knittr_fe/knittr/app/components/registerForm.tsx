import { useState } from "react";
import { useRegister } from "../hooks/useRegister";
// import AuthContext from "../context/authContext";
// import { AuthContext } from "../context/authContext";


const RegisterForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const { auth } = useRegister({ username, password });
    // const [_, setAuth] = useContext(AuthContext);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (password !== confirmPassword) {
            // TODO throw error
        } else {
            // TODO best way to handle?
            const { auth } = useRegister({ username, password });
            // setAuth(auth)
            console.log()
        }
    }

    return (
        // <AuthContext.Provider value={auth}>
        <form onSubmit={handleSubmit}>
            {/* TODO add input/label combos as discreet components? */}
            <input
                type="text"
                name="username"
                id="username"
                value={username}
                placeholder="Username"
                onChange={e => setUsername(e.target.value)}
            />
            <input
                type="password"
                name="password"
                id="password"
                value={password}
                placeholder="Password"
                onChange={e => setPassword(e.target.value)}
            />
            <input
                type="password"
                name="confirm-password"
                id="confirm-password"
                value={confirmPassword}
                placeholder="Confirm Password"
                onChange={e => setConfirmPassword(e.target.value)}
            />
            <button type="submit">Register</button>
        </form>
        // </AuthContext.Provider>
    )
}

export default RegisterForm;
