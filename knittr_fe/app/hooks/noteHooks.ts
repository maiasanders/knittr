import { useEffect, useState } from "react"
import notesService from "../services/notesService"
import { Note } from "../helpers/apiResponseTypes"


const useNotes = (projId: number) => {

    const [allNotes, setAllNotes] = useState<Note[]>([])

    useEffect(() => {
        const getNotes = async () => {
            await notesService.getNotes(projId).then(res => setAllNotes(res.data))
        }
        getNotes()
    }, [])

    const postNote = async (body: string) => {
        const note: Note = { noteId: 0, body: body, projectId: projId }
        await notesService.addNote(note).then(res => setAllNotes([...allNotes, res.data]))
    }

    return { allNotes, postNote }


}

export default useNotes
