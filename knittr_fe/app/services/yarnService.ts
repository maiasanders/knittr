import apiAccess from "./axiosConfig"

export default {
    getYarns() {
        return apiAccess.get('/yarns')
    }
}
