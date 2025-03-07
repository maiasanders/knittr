import apiAccess from "./axiosConfig"

export default {
    getSizes() {
        return apiAccess.get("/sizes")
    }
}
