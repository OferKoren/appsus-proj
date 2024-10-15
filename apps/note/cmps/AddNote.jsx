import { noteService } from '../services/note.service.js'
import { DynamicNote } from './notes/DynamicNote.jsx'
const { useState, useEffect, useRef } = React
// import {} from '../../../assets/img/notes-icons/'
export function AddNote({ addNote }) {
    const [note, setNote] = useState(noteService.getEmptyNote())
    const [isEdit, setIsEdit] = useState(false)
    const formRef = useRef()
    const pinRef = useRef()
    const noteRef = useRef(note)
    useEffect(() => {
        // console.log(note)
        noteRef.current = note
    }, [note])

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    function handleClickOutside(ev) {
        if (formRef.current && !formRef.current.contains(ev.target)) {
            const note = noteRef.current
            if (note.txt || note.title || note.todos) return
            setIsEdit(false)
            // setNote(noteService.getEmptyNote())
        }
    }

    function handleChange({ target }, newNote = null) {
        if (newNote) {
            setNote((prevNote) => ({ ...prevNote, ...newNote }))
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
        if (field.includes('todo')) {
            const idx = field.split('todo')[1]

            setNote((prevNote) => ({ ...prevNote, todo: [pre] }))
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
    function togglePin() {
        const notActiveSrc = '../../../assets/img/notes-icons/pinned-not-active.svg'
        const activeSrc = '../../../assets/img/notes-icons/pinned-active-icon.svg'
        setNote((prevNote) => ({ ...prevNote, isPinned: !prevNote.isPinned }))

        pinRef.current.src = note.isPinned ? notActiveSrc : activeSrc
    }
    if (!note) return
    const todoSrc = '../../../assets/img/notes-icons/checked-box-icon.svg'
    return (
        <div className="add-note" onClick={() => setIsEdit(true)}>
            <form ref={formRef} action="" className="add-note-form" onSubmit={onAddNote}>
                <DynamicNote note={note} handleChange={handleChange} isEdit={isEdit} />

                {isEdit && (
                    <React.Fragment>
                        <button className="btn add-btn">Add Note</button>
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
