import { redirect } from "react-router-dom"

export async function loader() {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    redirect("/login")
}

export default function Logout() {
    return (<>Logging out...</>)
}
