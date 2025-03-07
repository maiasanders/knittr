import RegisterForm from "../components/registerForm"
import { Form, Link, redirect } from 'react-router-dom'
import type { Route } from './+types/registerPage'
import authService from "../services/authService";

export async function clientAction({ request }: Route.ClientActionArgs) {
    const formData = await request.formData();
    const registerInfo = Object.fromEntries(formData);
    if (registerInfo.password !== registerInfo.confirmPassword) {
        // TODO do something error handling
    } else {
        const response = await authService.register({
            username: registerInfo.username,
            password: registerInfo.password
        }).then((res) => {
            if (res.status === 201) {
                localStorage.setItem("token", res.data.token)
                localStorage.setItem("user", res.data.username)
                return redirect("/patterns/discover")
            }
        })
    }
}

const RegisterPage = () => {
    return (
        <>
            {/* <RegisterForm /> */}
            <Form method="post">
                {/* TODO add input/label combos as discreet components? */}
                <input
                    type="text"
                    name="username"
                    id="username"
                    // value={username}
                    placeholder="Username"
                // onChange={e => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    name="password"
                    id="password"
                    // value={password}
                    placeholder="Password"
                // onChange={e => setPassword(e.target.value)}
                />
                <input
                    type="password"
                    name="confirmPassword"
                    id="confirm-password"
                    // value={confirmPassword}
                    placeholder="Confirm Password"
                // onChange={e => setConfirmPassword(e.target.value)}
                />
                <button type="submit" className="btn">Register</button>
            </Form>
            <p>Already have an account?</p>
            {/* TODO add path */}
            <Link to="/login">Login in!</Link>
        </>
    )
}

export default RegisterPage
