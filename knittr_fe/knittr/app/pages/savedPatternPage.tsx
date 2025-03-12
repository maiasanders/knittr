import SavedPatternList from "../components/savedPatternList";
import patternService from "../services/patternService";
import type { Route } from "../+types/loginPage"
import { useState } from "react";

export async function clientLoader({ params }: Route.LoaderArgs) {
    const patterns = await patternService.getSaved().then(r => r.data)
    return { patterns }
}

const SavedPatternPage = ({ loaderData }: { loaderData: Route.ComponentProps }) => {
    const { patterns } = loaderData


    return (
        <>
            {patterns.length > 0 ? (<SavedPatternList patterns={patterns} />) : (<p>No saved patterns</p>)}
        </>
    )
}

export default SavedPatternPage
