import { deepCopy } from '../../../services/util.service.js'
import { noteService } from '../services/note.service.js'
import { ColorPicker } from './ColorPicker.jsx'
import { DynamicNote } from './notes/DynamicNote.jsx'
const { useState, useEffect, useRef } = React
// import {} from '../../../assets/img/notes-icons/'
export function AddNote({ addNote, noteToEdit, onToggleColorPicker, colorPickerRef, isClrRef }) {
    const initNote = noteToEdit ? deepCopy(noteToEdit) : noteService.getEmptyNote()
    const [note, setNote] = useState(initNote)
    const [isEdit, setIsEdit] = useState(false)

    const formRef = useRef()
    const pinRef = useRef()
    const noteRef = useRef(note)
    const inputRef = useRef(null)

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

        if (field === 'url') {
            changeNoteType('NoteImg')
            setIsEdit(true)
            addFileDataURLToNote(target.files[0])
            return
        }
        setNote((prevNote) => ({ ...prevNote, [field]: value }))
    }
    function addFileDataURLToNote(file) {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        // This event fires when the reading operation is successfully completed
        reader.onloadend = () => {
            const dataUrl = reader.result // This contains the Data URL
            const newInfo = { ...note.info, url: dataUrl }

            setNote((prevNote) => ({ ...prevNote, info: newInfo })) // Store it in state if using React
        }

        // Start reading the file as a Data URL
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
        if (info.txt || info.title || info.todos.length > 0 || info.url) addNote(noteToAdd)
        setIsEdit(false)
        setNote(noteService.getEmptyNote())
    }
    function changeNoteType(toType) {
        setNote((prevNote) => ({ ...prevNote, type: toType }))
    }

    function togglePin() {
        const notActiveSrc = './assets/img/notes-icons/pinned-not-active.svg'
        const activeSrc = './assets/img/notes-icons/pinned-active-icon.svg'
        setNote((prevNote) => ({ ...prevNote, isPinned: !prevNote.isPinned }))

        pinRef.current.src = note.isPinned ? notActiveSrc : activeSrc
    }

    if (!note) return
    const addBtnContent = noteToEdit ? 'Update Note' : 'Add Note'
    const threeDotsIconsSrc = './assets/img/notes-icons/small-three-dots-icon.svg'
    const colorsIconSrc = './assets/img/notes-icons/color-pallet-icon.svg'
    const todoIconSrc = './assets/img/notes-icons/checked-box-icon.svg'
    const addPictureIconSrc = './assets/img/notes-icons/add-pitcure-icon.svg'
    return (
        <div className="add-note" onClick={() => setIsEdit(true)} style={note.style}>
            <form ref={formRef} action="" className="add-note-form" onSubmit={onAddNote}>
                <DynamicNote note={note} handleChange={handleChange} isEdit={isEdit} />
                <input
                    ref={inputRef}
                    type="file"
                    name="url"
                    className="img-input hidden"
                    onChange={handleChange}
                    accept="image/png, image/jpeg, image/gif"
                    onClick={(ev) => ev.stopPropagation()}
                />
                {isEdit && (
                    <React.Fragment>
                        <button type="button" className="btn pin-btn" onClick={togglePin}>
                            <img ref={pinRef} src="./assets/img/notes-icons/pinned-not-active.svg" alt="" />
                        </button>
                        <div className="btns-control-panel">
                            <button
                                onClick={(ev) => {
                                    isClrRef.current = true
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

                    <button
                        className="img-btn btn"
                        onClick={(ev) => {
                            console.log(ev.target)
                            ev.stopPropagation()
                            inputRef.current.click()
                        }}
                    >
                        <img src={addPictureIconSrc} alt="" />
                    </button>
                </React.Fragment>
            )}
        </div>
    )
}
