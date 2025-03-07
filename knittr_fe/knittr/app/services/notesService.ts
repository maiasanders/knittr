import { Note } from "../helpers/apiResponseTypes";
import apiAccess from "./axiosConfig";

export default {
    addNote(note: Note) {
        return apiAccess.post('/notes', note)
    },
    editNote(id: number, note: Note) {
        return apiAccess.put(`/notes/${id}`, note)
    },
    deleteNote(id: number) {
        return apiAccess.delete(`/notes/${id}`)
    },
    getNotes(projId: number) {
        return apiAccess.get(`/projects/${projId}/notes`)
    }
}
