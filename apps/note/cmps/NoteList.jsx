import { NotePreview } from '../cmps/NotePreview.jsx'
export function NoteList({ notes }) {
    return (
        <section className="note-list">
            {notes.map((note) => {
                return <NotePreview key={note.id} note={note} />
            })}
        </section>
    )
}
