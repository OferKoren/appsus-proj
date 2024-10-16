import { noteService } from '../services/note.service.js'
import { deepCopy } from '../../../services/util.service.js'
import { NoteList } from '../cmps/NoteList.jsx'
import { AddNote } from '../cmps/AddNote.jsx'
import { EditNote } from '../cmps/EditNote.jsx'
import { ColorPicker } from '../cmps/ColorPicker.jsx'
const { useState, useEffect, useRef } = React

export function NoteIndex({ rootFilterBy, setApp }) {
    const [notes, setNotes] = useState(null)
    const [filterBy, setFilterBy] = useState({ ...rootFilterBy })
    const [noteToEdit, setNoteToEdit] = useState(null)

    const [colorPicker, setColorPicker] = useState({ isOpen: false, ev: null, note: null, setNote: null })
    const [isClrBtn, setIsClrBtn] = useState(false)
    const isClrRef = useRef(null)
    const colorPickerRef = useRef(null)

    useEffect(() => {
        setFilterBy({ ...rootFilterBy })
    }, [rootFilterBy])

    useEffect(() => {
        loadNotes()
    }, [filterBy])
    /*   useEffect(() => {
        isClrRef.current = isClrBtn
    }, [isClrBtn]) */

    useEffect(() => {
        setApp('Keep')
        document.addEventListener('mousedown', handleClickOutsideColorPicker)
        return () => {
            document.removeEventListener('mousedown', handleClickOutsideColorPicker)
        }
    }, [])

    function loadNotes() {
        noteService.query(filterBy).then((res) => {
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
    function onToggleColorPicker(close, ev, note, setNote) {
        if (close) {
            setColorPicker(() => ({ isOpen: false, ev: null, note: null, setNote: null }))
            return null
        }
        ev.stopPropagation()
        const isOpen = colorPicker.isOpen
        if (isOpen) setColorPicker(() => ({ isOpen: false, ev: null, note: null, setNote: null }))
        else {
            setColorPicker(() => ({ isOpen: true, ev: ev, note: note, setNote: setNote }))
        }
    }
    function testing() {
        console.log('just testing')
    }
    function handleClickOutsideColorPicker(ev) {
        setTimeout(() => {
            const isColorPicker = colorPickerRef.current && colorPickerRef.current.contains(ev.target)
            if (!isColorPicker) {
                if (isClrRef.current) {
                    // setIsClrBtn(false)
                    isClrRef.current = false
                    return
                }
                onToggleColorPicker(true)
            }
        }, 100)
    }
    if (!notes) return <div>loading...</div>
    return (
        <section className="note-index full main-layout">
            <section className={`edit-note-backdrop ${noteToEdit ? 'on' : ''}`}></section>
            {colorPicker.isOpen && <ColorPicker colorPicker={colorPicker} colorPickerRef={colorPickerRef} />}
            {noteToEdit && (
                <EditNote
                    addNote={onUpdateNote}
                    noteToEdit={noteToEdit}
                    onToggleColorPicker={onToggleColorPicker}
                    setIsClrBtn={setIsClrBtn}
                    isClrRef={isClrRef}
                    colorPickerRef={colorPickerRef}
                    testing={testing}
                />
            )}
            <AddNote
                addNote={addNote}
                isClrRef={isClrRef}
                onToggleColorPicker={onToggleColorPicker}
                colorPickerRef={colorPickerRef}
                setIsClrBtn={setIsClrBtn}
                testing={testing}
            />
            <NoteList
                notes={notes}
                onDeleteNote={onDeleteNote}
                onUpdateNote={onUpdateNote}
                onDuplicate={onDuplicate}
                onEditNote={onEditNote}
                onToggleColorPicker={onToggleColorPicker}
                colorPickerRef={colorPickerRef}
                setIsClrBtn={setIsClrBtn}
                isClrRef={isClrRef}
            />
        </section>
    )
}
