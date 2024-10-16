import { noteService } from '../services/note.service.js'
import { deepCopy } from '../../../services/util.service.js'
import { NoteList } from '../cmps/NoteList.jsx'
import { AddNote } from '../cmps/AddNote.jsx'
import { EditNote } from '../cmps/EditNote.jsx'
const { useState, useEffect } = React

export function NoteIndex() {
    const [notes, setNotes] = useState(null)
    const [filterBy, setFilterBy] = useState(null)
    const [noteToEdit, setNoteToEdit] = useState(null)

    useEffect(() => {
        loadNotes()
    }, [filterBy])
    useEffect(() => {
        if (notes) console.log(notes[0])
    }, [notes])
    function loadNotes() {
        noteService.query().then((res) => {
            setNotes(res)
        })
    }

    function addNote(note, isDup = false) {
        noteService.save(note, isDup).then((newNote) => {
            console.log('successfully added a note')
            setNotes((prevNotes) => {
                return [newNote, ...prevNotes]
            })
        })
    }
    function onDeleteNote(ev, noteId) {
        ev.stopPropagation()
        console.log('deleteing', noteId)
        noteService.remove(noteId).then(() => {
            setNotes((prevNotes) => {
                return prevNotes.filter((note) => note.id !== noteId)
            })
        })
    }

    function onUpdateNote(updatedNote) {
        setNoteToEdit(null)
        // alert(JSON.stringify(updatedNote, null, 2))
        noteService.save(updatedNote).then(() => {
            setNotes((prevNotes) => {
                const idx = prevNotes.findIndex((note) => note.id === updatedNote.id)
                // alert(JSON.stringify(prevNotes[idx], null, 2))
                const newNotes = [...prevNotes]
                newNotes.splice(idx, 1, updatedNote)
                return deepCopy(newNotes)
            })
        })
    }

    function onDuplicate(note) {
        note.id = null
        addNote(note, true)
    }
    function onEditNote(note) {
        setNoteToEdit(() => deepCopy(note))
    }
    if (!notes) return <div>loading...</div>
    return (
        <section className="note-index">
            <section className={`edit-note-backdrop ${noteToEdit ? 'on' : ''}`}></section>
            {noteToEdit && <EditNote addNote={onUpdateNote} noteToEdit={noteToEdit} />}
            <AddNote addNote={addNote} />
            <NoteList notes={notes} onDeleteNote={onDeleteNote} onUpdateNote={onUpdateNote} onDuplicate={onDuplicate} onEditNote={onEditNote} />
        </section>
    )
}
