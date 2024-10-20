import { AddNote } from '../cmps/AddNote.jsx'
import { NoteList } from '../cmps/NoteList.jsx'
export function NoteHome({ addNoteProps, listNoteProps, setPage }) {
    return (
        <React.Fragment>
            <AddNote {...addNoteProps} />
            <NoteList {...listNoteProps} />
        </React.Fragment>
    )
}
