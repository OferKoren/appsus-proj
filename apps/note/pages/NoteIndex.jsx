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
    function onDeleteNote(noteId) {
        console.log('deleteing', noteId)
        noteService.remove(noteId).then(() => {
            setNotes((prevNotes) => {
                return prevNotes.filter((note) => note.id !== noteId)
            })
        })
    }

    function onUpdateNote(updatedNote) {
        console.log(notes)
        noteService.save(updatedNote).then(() => {
            setNotes((prevNotes) => {
                console.log(prevNotes)
                const idx = prevNotes.findIndex((note) => note.id === updatedNote.id)
                console.log(idx)
                const newNote = [...prevNotes]
                newNote.splice(idx, 1, updatedNote)
                console.log(newNote)
                return newNote
            })
        })
    }
    if (!notes) return <div>loading...</div>
    return (
        <section className="note-index">
            <AddNote addNote={addNote} />
            <NoteList notes={notes} onDeleteNote={onDeleteNote} onUpdateNote={onUpdateNote} />
        </section>
    )
}
