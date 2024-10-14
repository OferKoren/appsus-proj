import { NotePreview } from '../cmps/NotePreview.jsx'
export function NoteList({ notes, onDeleteNote }) {
    return (
        <section className="note-list">
            {notes.map((note) => {
                return (
                    <div key={note.id} className="note-wrapper">
                        <button className="delete-btn" onClick={() => onDeleteNote(note.id)}>
                            🗑️
                        </button>
                        <NotePreview note={note} />
                    </div>
                )
            })}
        </section>
    )
}
