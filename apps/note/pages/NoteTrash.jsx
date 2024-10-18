import { AddNote } from '../cmps/AddNote.jsx'
import { NoteList } from '../cmps/NoteList.jsx'
export function NoteTrash({ listNoteProps }) {
    return (
        <React.Fragment>
            <h2>trash</h2>
            <NoteList {...listNoteProps} />
        </React.Fragment>
    )
}
