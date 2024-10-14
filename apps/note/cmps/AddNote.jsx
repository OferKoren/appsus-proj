import { noteService } from '../services/note.service.js'
const { useState, useEffect } = React

export function AddNote({ addNote }) {
    const [isEdit, setIsEdit] = useState(false)
    const [note, setNote] = useState(noteService.getEmptyNote())

    function handleChange({ target }) {
        const field = target.name
        // console.log('field:', field)
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
    }
    console.log(isEdit)
    console.log(note)
    if (!note) return
    return (
        <React.Fragment>
            <div className="add-note" onClick={() => setIsEdit(true)}>
                <form action="" className="add-note-form" onSubmit={onAddNote}>
                    {isEdit && <input type="text" name="title" id="title" placeholder="title" onChange={handleChange} value={note.title} />}
                    <input type="text" name="txt" id="txt" placeholder="write new note..." onChange={handleChange} value={note.txt} />
                    {isEdit && <button>add</button>}
                </form>
            </div>
        </React.Fragment>
    )
}
