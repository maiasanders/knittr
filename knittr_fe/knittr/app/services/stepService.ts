import { StepDto } from "../helpers/apiResponseTypes";
import apiAccess from "./axiosConfig";

export default {
    createStep(step: StepDto) {
        return apiAccess.post("/steps", step)
    },
    getSteps(id: number) {
        return apiAccess.get(`/projects/${id}/steps`)
    },
    getByVariant(id: number) {
        return apiAccess.get(`/patterns/variants/${id}`)
    }
}
