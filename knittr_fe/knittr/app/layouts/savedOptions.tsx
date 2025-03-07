import { Outlet } from "react-router";
import SavedTabs from "../components/savedTabs";


export default function SavedOptions() {
    return (
        <>
            <SavedTabs />
            <Outlet />
        </>
    )
}
