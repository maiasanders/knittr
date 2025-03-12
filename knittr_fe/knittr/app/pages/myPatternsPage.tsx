import MyPatternsList from "../components/myPatternsList"
import type { Route } from "./+types/myPatternsPage"
import patternService from "../services/patternService"
import { Pattern } from "../helpers/apiResponseTypes"
import { Link } from "react-router-dom"


export async function clientLoader() {
    const patterns = await patternService.getByAuthor().then(r => r.data)
    return { patterns }
}

const MyPatternsPage = ({ loaderData }: Route.ComponentProps<Pattern[]>) => {

    const { patterns } = loaderData

    return (
        <>
            <MyPatternsList patterns={patterns} />
            <Link to={"/patterns/new"} className="btn">Create new Pattern</Link >
        </>
    )
}

export default MyPatternsPage
