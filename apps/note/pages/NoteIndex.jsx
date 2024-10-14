import { noteService } from '../services/note.service.js'
import { NoteList } from '../cmps/NoteList.jsx'
import { AddNote } from '../cmps/AddNote.jsx'
const { useState, useEffect } = React

export function NoteIndex() {
    const [notes, setNotes] = useState(null)

    function addNote(note) {
        noteService.save(note).then(() => {
            console.log('successfully added a note')
        })
    }
    useEffect(() => {
        noteService.query().then(setNotes)
    }, [])
    if (!notes) return <div>loading...</div>
    return (
        <section className="note-index">
            <AddNote addNote={addNote} />
            <NoteList notes={notes} />
        </section>
    )
}
