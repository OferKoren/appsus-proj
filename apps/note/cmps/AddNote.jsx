import { deepCopy } from '../../../services/util.service.js'
import { noteService } from '../services/note.service.js'
import { ColorPicker } from './ColorPicker.jsx'
import { DynamicNote } from './notes/DynamicNote.jsx'
const { useState, useEffect, useRef } = React
// import {} from '../../../assets/img/notes-icons/'
export function AddNote({ addNote, noteToEdit, onToggleColorPicker, colorPickerRef, setIsClrBtn }) {
    const initNote = noteToEdit ? deepCopy(noteToEdit) : noteService.getEmptyNote()
    const [note, setNote] = useState(initNote)
    const [isEdit, setIsEdit] = useState(false)

    const formRef = useRef()
    const pinRef = useRef()
    const noteRef = useRef(note)

    useEffect(() => {
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
        const isColorPicker = colorPickerRef.current && colorPickerRef.current.contains(ev.target)
        const isNotForm = formRef.current && !formRef.current.contains(ev.target)

        if (isNotForm) {
            if (isColorPicker) return null
            const note1 = noteRef.current
            const info = note1.info
            if ((info.txt || info.title || info.todos.length > 0) && !noteToEdit) {
                return null
            }
            setIsEdit(false)
            if (noteToEdit) {
                onAddNote(ev, note1)
            }
            setNote(noteService.getEmptyNote())
            onToggleColorPicker(true)
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
        const noteToAdd = EditedNote ? EditedNote : { ...note }

        if (noteToAdd.type === 'NoteTodo') {
            const todos = noteToAdd.info.todos
            todos.splice(todos.length - 1, 1)
            noteToAdd.info.todos === todos
        }
        const info = { ...note.info }
        if (info.txt || info.title || info.todos.length > 0) addNote(noteToAdd)
        setIsEdit(false)
        setNote(noteService.getEmptyNote())
        onToggleColorPicker(true)
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
    const threeDotsIconsSrc = '../../../assets/img/notes-icons/small-three-dots-icon.svg'
    const colorsIconSrc = '../../../assets/img/notes-icons/color-pallet-icon.svg'
    const todoIconSrc = '../../../assets/img/notes-icons/checked-box-icon.svg'
    const addPictureIconSrc = '../../../assets/img/notes-icons/add-pitcure-icon.svg'
    return (
        <div className="add-note" onClick={() => setIsEdit(true)} style={note.style}>
            <form ref={formRef} action="" className="add-note-form" onSubmit={onAddNote}>
                <DynamicNote note={note} handleChange={handleChange} isEdit={isEdit} />

                {isEdit && (
                    <React.Fragment>
                        <button type="button" className="btn pin-btn" onClick={togglePin}>
                            <img ref={pinRef} src="../../../assets/img/notes-icons/pinned-not-active.svg" alt="" />
                        </button>
                        <div className="btns-control-panel">
                            <button
                                onClick={(ev) => {
                                    setIsClrBtn(() => {
                                        return true
                                    })
                                    onToggleColorPicker(null, ev, note, setNote)
                                }}
                                type="button"
                                className="btn color-picker-btn"
                            >
                                <img src={colorsIconSrc} alt="" />
                            </button>

                            <button type="button" className="btn color-picker-btn">
                                <img src={threeDotsIconsSrc} alt="" />
                            </button>

                            <button className="btn add-btn">{addBtnContent}</button>
                        </div>
                    </React.Fragment>
                )}
            </form>

            {!isEdit && (
                <React.Fragment>
                    <button className="todo-btn btn" onClick={() => changeNoteType('NoteTodo')}>
                        <img src={todoIconSrc} alt="" />
                    </button>

                    <button className="img-btn btn" onClick={() => changeNoteType('NoteImg')}>
                        <img src={addPictureIconSrc} alt="" />
                    </button>
                </React.Fragment>
            )}
        </div>
    )
}
