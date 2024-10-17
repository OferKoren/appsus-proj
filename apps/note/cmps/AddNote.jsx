import { deepCopy } from '../../../services/util.service.js'
import { noteService } from '../services/note.service.js'
import { DynamicNote } from './notes/DynamicNote.jsx'
const { useState, useEffect, useRef } = React
// import {} from '../../../assets/img/notes-icons/'
export function AddNote({ addNote, noteToEdit }) {
    const initNote = noteToEdit ? deepCopy(noteToEdit) : noteService.getEmptyNote()
    const [note, setNote] = useState(initNote)
    const [isEdit, setIsEdit] = useState(false)
    const formRef = useRef()
    const pinRef = useRef()
    const noteRef = useRef(note)

    useEffect(() => {
        console.log(note)
        noteRef.current = note
    }, [note])

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    useEffect(() => {
        if (noteToEdit) {
            setIsEdit(true)
        }
    }, [])

    function handleClickOutside(ev) {
        if (formRef.current && !formRef.current.contains(ev.target)) {
            const note1 = noteRef.current
            if (note1.txt || note1.title || note1.todos) return
            setIsEdit(false)
            if (noteToEdit) {
                onAddNote(ev, note1)
            }
            setNote(noteService.getEmptyNote())
        }
    }

    function handleChange({ target }, newNote = null) {
        if (newNote) {
            setNote(() => deepCopy(newNote))
            return
        }

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
        if (field === 'txt' || field === 'title') {
            setNote((prevNote) => {
                const info = { ...prevNote.info, [field]: value }
                return { ...prevNote, info }
            })
            return
        }
        setNote((prevNote) => ({ ...prevNote, [field]: value }))
    }

    function onAddNote(ev, EditedNote = null) {
        ev.preventDefault()
        const noteToAdd = EditedNote ? deepCopy(EditedNote) : { ...note }

        if (noteToAdd.type === 'NoteTodo') {
            const todos = noteToAdd.info.todos
            todos.splice(todos.length - 1, 1)
            noteToAdd.info.todos === todos
        }
        console.log(noteToAdd)
        addNote(noteToAdd)
        setIsEdit(false)
        setNote(noteService.getEmptyNote())
    }
    function changeNoteType(toType) {
        setNote((prevNote) => ({ ...prevNote, type: toType }))
    }

    function togglePin() {
        const notActiveSrc = '../../../assets/img/notes-icons/pinned-not-active.svg'
        const activeSrc = '../../../assets/img/notes-icons/pinned-active-icon.svg'
        setNote((prevNote) => ({ ...prevNote, isPinned: !prevNote.isPinned }))

        pinRef.current.src = note.isPinned ? notActiveSrc : activeSrc
    }

    if (!note) return
    const addBtnContent = noteToEdit ? 'Update Note' : 'Add Note'

    const todoSrc = '../../../assets/img/notes-icons/checked-box-icon.svg'
    return (
        <div className="add-note" onClick={() => setIsEdit(true)}>
            <form ref={formRef} action="" className="add-note-form" onSubmit={onAddNote}>
                <DynamicNote note={note} handleChange={handleChange} isEdit={isEdit} />

                {isEdit && (
                    <React.Fragment>
                        <button className="btn add-btn">{addBtnContent}</button>
                        <button type="button" className="btn pin-btn" onClick={togglePin}>
                            <img ref={pinRef} src="../../../assets/img/notes-icons/pinned-not-active.svg" alt="" />
                        </button>
                    </React.Fragment>
                )}
            </form>

            {!isEdit && (
                <button className="todo-btn btn" onClick={() => changeNoteType('NoteTodo')}>
                    <img src={todoSrc} alt="" />
                </button>
            )}
        </div>
    )
}
