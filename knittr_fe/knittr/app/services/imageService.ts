import apiAccess from "./axiosConfig"

export default {
    getImagesByPattern(id: number) {
        return apiAccess.get(`/patterns/${id}/images`)
    }
}
