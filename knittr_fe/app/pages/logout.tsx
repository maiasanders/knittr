import { redirect } from "react-router-dom"

export async function clientLoader() {
    localStorage.removeItem("token")
    localStorage.removeItem("user")

    console.log("aaah")

    return redirect("/login")
}

export default function Logout() {
    return (<main>Logging out...</main>)
}
