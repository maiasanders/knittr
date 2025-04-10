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

    return (
        <Carousel
            activeIndex={activeIndex}
            interval={null}
            indicators={false}
            slide={false}
            onSelect={handleSelect}
            id="pattern-img-carousel"
            keyboard={true}
        >
            {images.map((img) => (
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
