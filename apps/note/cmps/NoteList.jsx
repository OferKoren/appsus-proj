import { NotePreview } from '../cmps/NotePreview.jsx'
export function NoteList({ notes, onDeleteNote, onUpdateNote, onDuplicate }) {
    const notesMap = mapNotes()
    function mapNotes() {
        return notes.reduce(
            (map, note) => {
                if (note.isPinned) map.pinned.push(note)
                else map.others.push(note)
                return map
            },
            { pinned: [], others: [] }
        )
    }
    function togglePin(note) {
        note.isPinned = !note.isPinned
        onUpdateNote(note)
    }
    function createNoteList(noteArr) {
        return noteArr.map((note) => {
            return (
                <div key={note.id} className="note-wrapper">
                    <button className="delete-btn" onClick={() => onDeleteNote(note.id)}>
                        🗑️
                    </button>
                    <button onClick={() => togglePin(note)}>toggle pin</button>
                    <button onClick={() => onDuplicate(note)}>Duplicate</button>
                    <NotePreview note={note} />
                </div>
            )
        })
    }
    console.log(notesMap)
    return (
        <section className="note-list-container">
            <h2>pinned</h2>
            <section className="note-list pinned">{createNoteList(notesMap.pinned)}</section>

            <h2>rest of the notes</h2>

            <section className="note-list others">{createNoteList(notesMap.others)}</section>
        </section>
    )
}
