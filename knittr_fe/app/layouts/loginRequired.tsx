import { Outlet } from "react-router";
import { redirect } from 'react-router-dom'
import type { Route } from "./+types/loginRequired"
import { useEffect } from "react";

export default function LoginRequired() {

    useEffect(() => {
        if (!localStorage.getItem('token')) throw data("Record Not Found", { status: 404 });
    }, [])

    return (<>
        <Outlet />
    </>)
}
