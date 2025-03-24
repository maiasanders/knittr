import { data } from "react-router-dom"
import PatternDetailHeader from "../../components/patternDetailHeader/patternDetailHeader"
import PatternDetailsDesc from "../../components/patternDetailsDesc"
import type { Route } from "./+types/patternDetailsDesc";
import patternService from "../../services/patternService"
import imageService from "../../services/imageService"
import { useEffect, useState } from "react"
import StartProject from "../../components/startProject"
import Modal from 'react-bootstrap/Modal'
import './patternDetailPage.css'
import { Image } from "../../helpers/apiResponseTypes";

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
    const [selectedImg, setSelectedImg] = useState<Image>()

    useEffect(() => {
        if (localStorage.getItem('token')) setIsLoggedIn(true)
    }, [])

    return (<main id="pat-detail">
        <PatternDetailHeader pattern={pattern} isLoggedIn={isLoggedIn} />
        <img
            src={pattern.defaultImage ? pattern.defaultImage.imageLink : '/placeholder.svg'}
            alt={pattern.defaultImage ? pattern.defaultImage.desc : "No images found"} />
        <PatternDetailsDesc pattern={pattern}
        />
        {showProjectStart ?
            (<Modal show={showProjectStart} onHide={() => setShowProjectStart(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Select size and yarn</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <StartProject pattern={pattern} />
                </Modal.Body>
            </Modal>)
            : <button
                id="make-it-btn"
                type="button"
                className="btn btn-primary"
                hidden={!isLoggedIn}
                onClick={() => setShowProjectStart(true)}
                data-bs-toggle="modal"
                data-bs-target="#project-start"
            >Make it!</button>
        }
        {/* TODO make so it shows full size img after clicking - carousel or modal maybe? */}
        {images ? <div id="all-pics">
            {images.map(image => (<img src={image.imageLink} alt={image.desc} key={`img-${image.imageId}`} />))}
        </div> : null}
    </main>)
}

export default PatternDetailsPage
