import { Outlet } from "react-router";
import SavedTabs from "../../components/savedTabs/savedTabs";
import './savedOptions.css'

export default function SavedOptions() {
    return (
        <main>
            <SavedTabs />
            <Outlet />
        </main>
    )
}
