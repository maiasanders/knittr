import RegisterForm from "../components/registerForm"
import { Link } from 'react-router-dom'

const RegisterPage = () => {
    return (
        <main>
            <RegisterForm />
            <p>Anlready have an account?</p>
            {/* TODO add path */}
            <Link to="#">Login in!</Link>
        </main>
    )
}

export default RegisterPage
