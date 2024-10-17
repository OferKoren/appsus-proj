import { AddNote } from './AddNote.jsx'
export function EditNote({ addNote, noteToEdit, onToggleColorPicker, colorPickerRef, setIsClrBtn }) {
    if (!noteToEdit) return
    return (
        <React.Fragment>
            <section className="edit-note">
                <AddNote
                    setIsClrBtn={setIsClrBtn}
                    addNote={addNote}
                    noteToEdit={noteToEdit}
                    onToggleColorPicker={onToggleColorPicker}
                    colorPickerRef={colorPickerRef}
                />
            </section>
        </React.Fragment>
    )
}
