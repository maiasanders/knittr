import { ImageDto } from "../helpers/apiResponseTypes"
import apiAccess from "./axiosConfig"

export default {
    getImagesByPattern(id: number) {
        return apiAccess.get(`/patterns/${id}/images`)
    },
    createImage(image: ImageDto) {
        return apiAccess.post('/images', image)
    }
}
