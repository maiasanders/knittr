import apiAccess from "./axiosConfig"

type ProjectStartDto = {
    patternId: number,
    yarnId?: number,
    sizeId: number,
}

type UpdateProgressDto = {
    newRow: number,
    makerId: number
}

export default {
    getById(id: number) {
        return apiAccess.get(`/projects/${id}`)
    },
    create(project: ProjectStartDto) {
        return apiAccess.post('/projects', project)
    },
    getCurrent() {
        return apiAccess.get('/projects')
    },
    getCompleted() {
        return apiAccess.get('/projects/completed')
    },
    markCompleted(id: number) {
        return apiAccess.put(`/projects/${id}/complete`)
    },
    updateProgess(id: number, dto: UpdateProgressDto) {
        return apiAccess.put(`/projects/${id}/progress`, dto)
    }
}
