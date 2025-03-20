import { Form, Link, redirect } from 'react-router-dom'
import type { Route } from './+types/registerPage'
import authService from "../services/authService";

type RegisterInfo = {
    username: string,
    password: string,
    confirmPassword: string
}

export async function clientAction({ request }: Route.ClientActionArgs) {
    const formData = await request.formData();
    const registerInfo = Object.fromEntries(formData) as RegisterInfo;
    if (registerInfo.password !== registerInfo.confirmPassword) {
        // TODO better error handling
        window.alert("Passwords must match")
        return;
    }

    const response = await authService.register({

        username: registerInfo.username,
        password: registerInfo.password

    }).then((res) => res.data)
    localStorage.setItem("token", response.token)
    localStorage.setItem("user", response.username)
    return redirect("/patterns/discover")

}

const RegisterPage = () => {
    return (
        <main className="auth-page">
            {/* <RegisterForm /> */}
            <Form method="post" className="auth-form">
                <div className="form-floating">
                    <input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Username"
                        className="form-control"
                    />
                    <label htmlFor="username">Username</label>
                </div>
                <div className="form-floating">
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        className="form-control"
                    />
                    <label htmlFor="password">Password</label>
                </div>
                <div className="form-floating">
                    <input
                        type="password"
                        name="confirmPassword"
                        id="confirm-password"
                        placeholder="Confirm Password"
                        className="form-control"
                    />
                    <label htmlFor="confirm-password">Confirm Password</label>
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </Form>
            <p>Already have an account?</p>
            <Link to="/login">Login in!</Link>
        </ main>
    )
}

export default RegisterPage
