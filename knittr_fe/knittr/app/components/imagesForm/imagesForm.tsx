import { useState } from "react"
import { ImageDto } from "../../helpers/apiResponseTypes"
import ImageUploader from "../imageUploader/imageUploader"
import useImages from "../../hooks/useImages"
import './imagesForm.css'

const ImagesForm = ({ patternId }: { patternId: number }) => {

    const [images, setImages] = useState<ImageDto[]>([])
    const { postImages } = useImages(patternId);
    const [submitted, setSubmitted] = useState(false)

    const handleImageUpload = (url: string) => {
        const newImg: ImageDto = {
            imageLink: url,
            desc: '',
            patternId
        }

        setImages([...images, newImg])
    }

    const updateImg = (e: React.ChangeEvent<HTMLInputElement>, img: ImageDto) => {
        const updatedImg: ImageDto = { ...img, desc: e.currentTarget.value }
        const updatedImages = [...images]
        for (let i = 0; i < images.length; i++) {
            if (updatedImages[i].imageLink === img.imageLink) updatedImages[i] = { ...updatedImg }
        }
        setImages(updatedImages)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const totalLoaded = postImages(images)
            .then(r => r === images.length ? setSubmitted(true) : null)
    }

    return (
        <div id="add-images">
            {submitted ? (<h4>Images saved! Click button to return to your projects.</h4>) : (
                <>
                    <ImageUploader handleUpload={handleImageUpload} />
                    <form onSubmit={handleSubmit} id="image-form">
                        {images.map((img: ImageDto, i: number) => (
                            <div className='img-form-el' key={i}>
                                <img src={img.imageLink} className="img-thumb" />
                                <div className="form-floating">
                                    <input
                                        type="text"
                                        id={`desc-${i}`}
                                        name={`desc-${i}`}
                                        value={img.desc}
                                        onChange={e => updateImg(e, img)}
                                        className="form-control"
                                        placeholder="Description"
                                    />
                                    <label htmlFor={`desc-${i}`}>Description</label>
                                </div>
                            </div>

                        ))}
                        <button type="submit" className="btn btn-primary" disabled={images.length === 0}>Save Pictures</button>
                    </form>
                </>

            )}
        </div>
    )
}

export default ImagesForm
