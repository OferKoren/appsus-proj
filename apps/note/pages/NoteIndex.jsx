import { noteService } from '../services/note.service.js'
import { NoteList } from '../cmps/NoteList.jsx'
import { AddNote } from '../cmps/AddNote.jsx'
const { useState, useEffect } = React

export function NoteIndex() {
    const [notes, setNotes] = useState(null)
    const [filterBy, setFilterBy] = useState(null)

    useEffect(() => {
        loadNotes()
    }, [filterBy])

    function loadNotes() {
        noteService.query().then((res) => {
            setNotes(res)
        })
    }

    function addNote(note) {
        noteService.save(note).then((newNote) => {
            console.log('successfully added a note')
            setNotes((prevNotes) => {
                return [newNote, ...prevNotes]
            })
        })
    }

    if (!notes) return <div>loading...</div>
    return (
        <section className="note-index">
            <AddNote addNote={addNote} />
            <NoteList notes={notes} />
        </section>
    )
}
