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
import PatternImgCarousel from "../../components/patternImgCarousel/patternImgCarousel";

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
    const [showFullImg, setShowFullImg] = useState(false)

    useEffect(() => {
        if (localStorage.getItem('token')) setIsLoggedIn(true)
    }, [])

    const handleImgClick = (img: Image) => {
        setSelectedImg(img)
        setShowFullImg(true)
    }

    return (<main id="pat-detail">
        <PatternDetailHeader pattern={pattern} isLoggedIn={isLoggedIn} />
        <img
            src={pattern.defaultImage ? pattern.defaultImage.imageLink : (
                images.length > 0 ? images[0].imageLink : '/placeholder.svg')}
            alt={pattern.defaultImage ? pattern.defaultImage.desc : (
                images.length > 0 ? images[0].desc : "No images found")}
            onError={e => e.currentTarget.src = '../../placeholder.svg'}
            onClick={() => handleImgClick(pattern.defaultImage || images[0])}
        />
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
        {images ? <div id="all-pics">
            {images.map((image: Image) => (<img
                src={image.imageLink}
                alt={image.desc}
                key={`img-${image.imageId}`}
                onError={e => e.currentTarget.src = '../../placeholder.svg'}
                onClick={() => handleImgClick(image)}
            />))}
        </div> : null}
        <Modal
            show={showFullImg}
            onHide={() => setShowFullImg(false)}
            id="carousel-modal"
        >
            <Modal.Body>
                <PatternImgCarousel images={images} selectedImgId={selectedImg?.imageId || 0} />
            </Modal.Body>
        </Modal>
    </main>)
}

export default PatternDetailsPage
