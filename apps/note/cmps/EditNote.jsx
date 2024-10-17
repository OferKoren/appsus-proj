import { AddNote } from './AddNote.jsx'
export function EditNote({ addNote, noteToEdit, onToggleColorPicker, colorPickerRef }) {
    if (!noteToEdit) return
    return (
        <React.Fragment>
            <section className="edit-note">
                <AddNote addNote={addNote} noteToEdit={noteToEdit} onToggleColorPicker={onToggleColorPicker} colorPickerRef={colorPickerRef} />
            </section>
        </React.Fragment>
    )
}
