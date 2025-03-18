import { LoginDto } from "../helpers/apiResponseTypes";
import authService from "../services/authService";
import type { Route } from "./+types/loginPage";
import { Form } from "react-router";
import { redirect, Link } from "react-router-dom";

export async function clientAction({ request }: Route.ClientActionArgs) {
    const formData = await request.formData();
    const loginInfo = Object.fromEntries(formData) as LoginDto;
    const res = await authService.login(loginInfo).then(r => r.data)
    localStorage.setItem("token", res.token)
    localStorage.setItem("user", res.username)
    return redirect("/projects")
}

const LoginPage = () => {

    return (

        <main className="auth-page">
            <Form method="post" className="auth-form">
                <div className="form-floating">
                    <input
                        type="text"
                        name="username"
                        id="username"
                        className="form-control"
                        placeholder="Username"
                    />
                    <label htmlFor="username">Username</label>
                </div>
                <div className="form-floating">
                    <input
                        type="password"
                        name="password"
                        id="password"
                        className="form-control"
                        placeholder="Password"
                    />
                    <label htmlFor="password">Password</label>
                </div>
                <button type="submit" className="btn btn-primary">Sign in</button>
            </Form>
            <p>No account?</p>
            <Link to="/register">Register!</Link>
        </main>
    )
}

export default LoginPage
