import PublicPatternList from "../components/publicPatternList"
import patternService from "../services/patternService"
import type { Route } from "../+types/root"

export async function loader() {
    const patterns = await patternService.getAll().then(r => r.data)
    return { patterns }
}

const PublicPatternPage = ({ loaderData }: Route.ComponentProps) => {

    // TODO add filtering

    const { patterns } = loaderData

    return (
        <>
            <h1>Discover new patterns</h1>
            <PublicPatternList
                patterns={patterns}
            />
        </>
    )
}

export default PublicPatternPage
