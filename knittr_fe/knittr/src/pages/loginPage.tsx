import LoginForm from "../components/loginForm"
import { Link } from 'react-router-dom'


const LoginPage = () => {
    <main>
        <LoginForm />
        <p>No account?</p>
        {/* TODO change link to address */}
        <Link to="#"><p>Register!</p></Link>
    </main>
}

export default LoginPage
