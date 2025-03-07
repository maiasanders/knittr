import { Image } from "../helpers/apiResponseTypes"
import { useEffect, useState } from "react"
import imageService from "../services/imageService"

const useImages = (patternId: number) => {
    const [images, setImages] = useState<Image[]>([])

    useEffect(() => {
        const getImages = async (id: number) => {
            imageService.getImagesByPattern(id).then(res => setImages(res.data))
        }
        getImages(patternId)
    }, [images])

    return { images }
}

export default useImages
