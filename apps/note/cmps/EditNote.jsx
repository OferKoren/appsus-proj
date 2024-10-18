import { AddNote } from './AddNote.jsx'
export function EditNote({ addNote, noteToEdit, onToggleColorPicker, testing, colorPickerRef, setIsClrBtn, isClrRef }) {
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
                    isClrRef={isClrRef}
                    testing={testing}
                />
            </section>
        </React.Fragment>
    )
}
