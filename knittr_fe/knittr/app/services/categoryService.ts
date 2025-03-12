import apiAccess from "./axiosConfig"

export default {
    getAll() {
        return apiAccess.get("/categories")
    }
}
