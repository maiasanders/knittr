import { Outlet } from "react-router";
import SavedTabs from "../../components/savedTabs/savedTabs";
import './savedOptions.css'
import React from "react";
import LoadingSpinner from "../../components/loadingSpinner/loadingSpinner";

export default function SavedOptions() {
    return (
        <main>
            <SavedTabs />
            <React.Suspense fallback={<LoadingSpinner />}>
                <Outlet />
            </React.Suspense>
        </main>
    )
}
