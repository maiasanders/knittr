import { CategoryDto } from "../helpers/apiResponseTypes"
import apiAccess from "./axiosConfig"

export default {
    getAll() {
        return apiAccess.get("/categories")
    },
    add(dto: CategoryDto) {
        return apiAccess.post("/categories", dto)
    }
}
