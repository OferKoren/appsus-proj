import { AddNote } from './AddNote.jsx'
export function EditNote(props) {
    if (!props.noteToEdit) return
    return (
        <React.Fragment>
            <section className="edit-note">
                <AddNote {...props} />
            </section>
        </React.Fragment>
    )
}
