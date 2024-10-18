import { AddNote } from '../cmps/AddNote.jsx'
import { NoteList } from '../cmps/NoteList.jsx'
export function NoteArchive({ listNoteProps }) {
    return (
        <React.Fragment>
            <h2>archive</h2>
            <NoteList {...listNoteProps} />
        </React.Fragment>
    )
}
