import { PatternDto } from "../helpers/apiResponseTypes";
import apiAccess from "./axiosConfig";

export default {
    getById(id: number) {
        return apiAccess.get(`/patterns/${id}`)
    },
    getAll() {
        return apiAccess.get(`/patterns`)
    },
    getByAuthor() {
        return apiAccess.get(`/patterns/mine`)
    },
    getSaved() {
        return apiAccess.get(`/patterns/saved`)
    },
    create(pattern: PatternDto) {
        return apiAccess.post(`/patterns`, pattern)
    },
    save(id: number) {
        return apiAccess.post(`/patterns/${id}/save`)
    },
    unsave(id: number) {
        return apiAccess.delete(`/patterns/${id}/save`)
    },
    update(id: number, pattern: PatternDto) {
        return apiAccess.put(`/patterns/${id}`, pattern)
    }
}
