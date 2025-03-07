import { LoginDto } from "../helpers/apiResponseTypes";
import authService from "../services/authService";
import type { Route } from "./+types/loginPage";
import { Form } from "react-router";
import { redirect } from "react-router-dom";

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

        <Form method="post">
            <div className="form-floating">
                <input
                    type="text"
                    name="username"
                    id="username"
                />
                <label htmlFor="username">Username</label>
            </div>
            <div className="form-floating">
                <input
                    type="password"
                    name="password"
                    id="password"
                />
                <label htmlFor="password">Password</label>
            </div>
            <button type="submit" className="btn">Sign in</button>
        </Form>
    )
}

export default LoginPage
