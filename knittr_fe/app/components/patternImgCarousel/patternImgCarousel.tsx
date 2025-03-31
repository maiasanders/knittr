import { Image } from "../../helpers/apiResponseTypes"
import Carousel from 'react-bootstrap/Carousel'
import './patternImgCarousel.css'
import { useState } from "react"

const PatternImgCarousel = ({ images, selectedImgId }: { images: Image[], selectedImgId: number }) => {
    const getDefaultIndex = () => {
        for (let i = 0; i < images.length; i++) {
            if (images[i].imageId === selectedImgId) return i
        }
    }

    const [activeIndex, setActiveIndex] = useState(getDefaultIndex())

    const handleSelect = (ind: number) => {
        setActiveIndex(ind)
    }
    // return
    // (<div id="pattern-img-carousel" className="carousel slide">
    //     <div className="carousel-inner">
    //         {images.map(img => (
    //             <div
    //                 className={`carousel-item${img.imageId === selectedImgId ? ' active' : ''}`}
    //                 key={img.imageId}
    //             >
    //                 <img
    //                     src={img.imageLink}
    //                     alt={img.desc}
    //                     className="d-block w-100"
    //                 />
    //             </div>))}
    //         <button
    //             className="carousel-control-prev"
    //             type="button"
    //             data-bs-target="#pattern-img-carousel"
    //             data-bs-slide="prev"
    //         >
    //             <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    //             <span className="visually-hidden">Previous</span>
    //         </button>
    //         <button
    //             className="carousel-control-next"
    //             type="button"
    //             data-bs-target="#pattern-img-carousel"
    //             data-bs-slide="next"
    //         >
    //             <span className="carousel-control-next-icon" aria-hidden="true"></span>
    //             <span className="visually-hidden">Next</span>
    //         </button>
    //     </div>
    // </div>)
    return (
        <Carousel
            activeIndex={activeIndex}
            interval={null}
            indicators={false}
            slide={false}
            onSelect={handleSelect}
            id="pattern-img-carousel"
        >
            {images.map((img, i) => (
                <Carousel.Item key={img.imageId}>
                    <div className="img-container">
                        <img src={img.imageLink} />

                    </div>
                    <Carousel.Caption>
                        <p>Made by {img.submittedBy.username}</p>
                        <p>{img.desc}</p>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>)
}

export default PatternImgCarousel
