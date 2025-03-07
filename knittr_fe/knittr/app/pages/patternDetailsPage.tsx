import { redirect, useParams } from "react-router-dom"
import PatternDetailHeader from "../components/patternDetailHeader"
import PatternDetailsDesc from "../components/patternDetailsDesc"
import { Pattern, Image } from "../helpers/apiResponseTypes"
import useImages from "../hooks/useImages"
import usePatternDetails from "../hooks/usePatternDetails"
import type { Route } from "../+types/root";
import patternService from "../services/patternService"
import imageService from "../services/imageService"

export async function loader({ params }: Route.LoaderArgs) {
    const pattern = await patternService.getById(params.id)
        .then((res) => {
            if (res.status === 200) {
                return res.data
            } else {
                throw new Response("Pattern not found", { status: 404 })
            }
        })

    const images = await imageService.getImagesByPattern(params.id)
        .then((res) => {
            if (res.status === 200) {
                return res.data
            }
        })

    return { pattern, images }
}

const PatternDetailsPage = ({ loaderData }: Route.ComponentProps) => {
    const { pattern, images } = loaderData

    return (<>
        <PatternDetailHeader pattern={pattern} />
        <img src={pattern.defaultImage.imageLink} alt={pattern.defaultImage.desc} />
        <PatternDetailsDesc pattern={pattern} />
        <div id="all-pics">
            {images.map(image => (<img src={image.imageLink} alt={image.desc} key={image.imageId} />))}
        </div>
    </>)
}

export default PatternDetailsPage
