import SavedPatternList from "../components/savedPatternList";
import patternService from "../services/patternService";
import type { Route } from "../+types/loginPage"
import { Link } from "react-router";

export async function clientLoader() {
    const patterns = await patternService.getSaved().then(r => r.data)
    return { patterns }
}

const SavedPatternPage = ({ loaderData }: { loaderData: Route.ComponentProps }) => {
    const { patterns } = loaderData


    return (
        <div className="saved-and-mine">
            {patterns.length > 0 ? (<SavedPatternList patterns={patterns} />) : (<p>No saved patterns. <Link to="/patterns/discover">Check out some</Link> to get started!</p>)}
        </div>
    )
}

export default SavedPatternPage
