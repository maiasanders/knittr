import apiAccess from "./axiosConfig";

type PatternDto = {
    name: string,
    desc: string,
    catIds?: number[]
}

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
        return apiAccess.get(`/patterns.saved`)
    },
    create(pattern: PatternDto) {
        return apiAccess.post(`/patterns`, pattern)
    }
}
