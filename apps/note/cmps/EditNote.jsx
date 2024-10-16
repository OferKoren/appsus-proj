import { AddNote } from './AddNote.jsx'
export function EditNote({ addNote, noteToEdit }) {
    if (!noteToEdit) return
    return (
        <React.Fragment>
            <section className="edit-note">
                <AddNote addNote={addNote} noteToEdit={noteToEdit} />
            </section>
        </React.Fragment>
    )
}
