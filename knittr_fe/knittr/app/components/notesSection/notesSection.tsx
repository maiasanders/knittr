import { FormEvent, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import useNotes from "../../hooks/noteHooks";
import "./notesSection.css"

export default function NotesSection({ projId }: { projId: number }) {
    const [showNewNote, setShowNewNote] = useState(false)
    const [newNote, setNewNote] = useState('')

    const { allNotes, postNote } = useNotes(projId)

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        postNote(newNote)
        setNewNote('')
        setShowNewNote(false)
    }

    return (
        <div id="notes-section">
            <h2>Notes</h2>
            {typeof allNotes !== 'undefined' ? (<ul id="saved-notes">
                {allNotes.map(note => (<li key={note.noteId}>{note.body}</li>))}
            </ul>) : null}

            {showNewNote ? (
                <form onSubmit={handleSubmit} id="new-note">
                    <textarea
                        name="body"
                        value={newNote}
                        onChange={e => setNewNote(e.target.value)}
                        className="form-control"
                    />
                    <button type="submit" className="btn btn-primary">Save</button>
                </form>
            ) : (<div id="add-note-btn" onClick={() => setShowNewNote(true)}><FontAwesomeIcon icon={faPlus} /></div>)}
        </div>
    )
}
