import { FormEvent, useState } from "react"
import { Note } from "../helpers/apiResponseTypes"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import useNotes from "../hooks/noteHooks";

const NotesSection = (projId: number) => {
    const [notes, setNotes] = useState<Note[]>([])
    const [showNewNote, setShowNewNote] = useState(false)
    const [newNote, setNewNote] = useState('')

    const { allNotes, postNote } = useNotes(projId)
    setNotes(allNotes)

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        postNote(newNote)
        setNotes(allNotes)
        setNewNote('')
        setShowNewNote(false)
    }

    return (
        <div id="notes-section">
            <h2>Notes</h2>
            <ul>
                {notes.map(note => (<li key={note.noteId}>{note.body}</li>))}
            </ul>
            {showNewNote ? (
                <form onSubmit={handleSubmit}>
                    <textarea value={newNote} onChange={e => setNewNote(e.target.value)} />
                    <button type="submit">Save</button>
                </form>
            ) : (<div id="add-note-btn" onClick={() => setShowNewNote(true)}><FontAwesomeIcon icon={faPlus} /></div>)}
        </div>
    )
}

export default NotesSection
