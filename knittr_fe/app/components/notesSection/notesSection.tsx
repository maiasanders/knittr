import React, { FormEvent, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import useNotes from "../../hooks/noteHooks";
import "./notesSection.css"
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import ClickableIcon from "../clickableIcon/clickableIcon";

export default function NotesSection({ projId, onClose }: { projId: number, onClose: React.MouseEventHandler }) {
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
        <div id="notes-section" className="bordered-light">
            <div id="notes-head">
                <h2>Notes</h2>
                <ClickableIcon icon={faEyeSlash} handleClick={onClose} />
                {/* <FontAwesomeIcon icon={faEyeSlash} /> */}
            </div>

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
