import { data } from "react-router-dom"
import PatternDetailHeader from "../../components/patternDetailHeader/patternDetailHeader"
import PatternDetailsDesc from "../../components/patternDetailsDesc"
import type { Route } from "../+types/root";
import patternService from "../../services/patternService"
import imageService from "../../services/imageService"
import { useEffect, useState } from "react"
import StartProject from "../../components/startProject"
import './patternDetailPage.css'

export async function loader({ params }: Route.LoaderArgs) {
    const pattern = await patternService.getById(params.id)
        .then((res) => {
            if (res.status === 200) {
                return res.data
            } else {
                throw new Response("Pattern not found", { status: 404 })
            }
        }).catch((err) => {
            if (err.response && err.response.status === 404) throw data("Pattern Not Found", { status: 404 });
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
    const [showProjectStart, setShowProjectStart] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('token')) setIsLoggedIn(true)
    }, [])

    return (<main id="pat-detail">
        <PatternDetailHeader pattern={pattern} isLoggedIn={isLoggedIn} />
        <img src={pattern.defaultImage ? pattern.defaultImage.imageLink : '/placeholder.svg'} alt={pattern.defaultImage ? pattern.defaultImage.desc : "No images found"} />
        <PatternDetailsDesc pattern={pattern} />
        {showProjectStart ?
            <StartProject pattern={pattern} />
            : <button
                id="make-it-btn"
                type="button"
                className="btn btn-primary"
                hidden={!isLoggedIn}
                onClick={() => setShowProjectStart(true)}
            >Make it!</button>
        }
        {images ? <div id="all-pics">
            {images.map(image => (<img src={image.imageLink} alt={image.desc} key={image.imageId} />))}
        </div> : null}
    </main>)
}

export default PatternDetailsPage
