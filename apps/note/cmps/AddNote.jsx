import { noteService } from '../services/note.service.js'
const { useState, useEffect, useRef } = React

export function AddNote({ addNote }) {
    const [note, setNote] = useState(noteService.getEmptyNote())
    const [isEdit, setIsEdit] = useState(false)
    const formRef = useRef()

    useEffect(() => {
        console.log(note)
    }, [note])
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
    function onBlurNote() {
        if (note.txt === '' && note.title === '') setIsEdit(false)
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
        <React.Fragment>
            <div className="add-note" onClick={() => setIsEdit(true)}>
                <form ref={formRef} action="" className="add-note-form" onSubmit={onAddNote} onBlur={onBlurNote}>
                    {isEdit && (
                        <input
                            autoComplete="off"
                            type="text"
                            name="title"
                            id="title"
                            placeholder="title"
                            onChange={handleChange}
                            value={note.title}
                        />
                    )}
                    <input
                        type="text"
                        autoComplete="off"
                        name="txt"
                        id="txt"
                        placeholder="write new note..."
                        onChange={handleChange}
                        value={note.txt}
                    />
                    {isEdit && <button>add</button>}
                </form>
                <button className="todo-btn" onClick={() => changeNoteType('NoteTodo')}>
                    todo
                </button>
            </div>
        </React.Fragment>
    )
}
