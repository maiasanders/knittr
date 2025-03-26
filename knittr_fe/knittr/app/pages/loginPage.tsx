import { LoginDto } from "../helpers/apiResponseTypes";
import authService from "../services/authService";
import type { Route } from "./+types/loginPage";
import { Form } from "react-router";
import { redirect, Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert"

export async function clientAction({ request }: Route.ClientActionArgs) {

    const formData = await request.formData();
    const loginInfo = Object.fromEntries(formData) as LoginDto;

    if (loginInfo.username.length === 0 || loginInfo.password.length === 0) {
        alertMsg = 'Username and password cannot be blank'
    }

    const res = await authService.login(loginInfo)
        .then(r => {
            if (r.status === 200) return r.data
            alertMsg = "We couldn't log you in. Check username and password and try again"
            return
        })
        .catch(e => {
            alertMsg = "We couldn't log you in. Check username and password and try again"
        })

    if (res.token) {
        localStorage.setItem("token", res.token)
        localStorage.setItem("user", res.username)

        return redirect("/projects")
    }
}

let alertMsg = ''

const LoginPage = () => {

    return (
        <main className="auth-page">
            {alertMsg.length > 0 && (
                <Alert variant='danger' onClose={() => alertMsg = ''} dismissible>{alertMsg}</Alert>
            )}
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
