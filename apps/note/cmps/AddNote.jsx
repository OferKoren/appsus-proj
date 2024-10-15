import { noteService } from '../services/note.service.js'
import { DynamicNote } from './notes/DynamicNote.jsx'
const { useState, useEffect, useRef } = React

export function AddNote({ addNote }) {
    const [note, setNote] = useState(noteService.getEmptyNote())
    const [isEdit, setIsEdit] = useState(false)
    const formRef = useRef()

    useEffect(() => {
        console.log(note)
    }, [note])

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    function handleClickOutside(ev) {
        if (formRef.current && !formRef.current.contains(ev.target)) {
            setIsEdit(false)
        }
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break

            case 'checkbox':
                value = target.checked
                break
        }
        setNote((prevNote) => ({ ...prevNote, [field]: value }))
    }

    function onAddNote(ev) {
        ev.preventDefault()
        addNote(note)
        setIsEdit(false)
        setNote(noteService.getEmptyNote())
    }
    function changeNoteType(toType) {
        setNote((prevNote) => ({ ...prevNote, type: toType }))
    }
    if (!note) return
    return (
        <div className="add-note" onClick={() => setIsEdit(true)}>
            <form ref={formRef} action="" className="add-note-form" onSubmit={onAddNote}>
                <DynamicNote note={note} handleChange={handleChange} isEdit={isEdit} />

                {isEdit && <button>add</button>}
            </form>
            <button className="todo-btn" onClick={() => changeNoteType('NoteTodo')}>
                todo
            </button>
        </div>
    )
}
