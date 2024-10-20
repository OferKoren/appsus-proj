import { AddNote } from '../cmps/AddNote.jsx'
import { NoteList } from '../cmps/NoteList.jsx'
const { useEffect } = React
export function NoteArchive({ listNoteProps, setPage }) {
    return (
        <React.Fragment>
            <h2>archive</h2>
            <NoteList {...listNoteProps} />
        </React.Fragment>
    )
}
