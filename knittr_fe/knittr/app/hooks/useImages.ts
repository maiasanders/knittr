import { Image, ImageDto } from "../helpers/apiResponseTypes"
import { useEffect, useState } from "react"
import imageService from "../services/imageService"

const useImages = (patternId: number) => {
    const [images, setImages] = useState<Image[]>([])
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const getImages = async (id: number) => {
            imageService.getImagesByPattern(id).then(res => setImages(res.data))
        }
        getImages(patternId)
    }, [images])

    async function postImages(images: ImageDto[]) {
        images.forEach(img => imageService.createImage(img).then(r => {
            if (r.status === 201) setProgress(progress + 1)
        }))
        return progress
    }

    return { images, postImages, progress }
}

export default useImages
