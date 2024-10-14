import { noteService } from '../services/note.service.js'
import { NoteList } from '../cmps/NoteList.jsx'

const { useState, useEffect } = React

export function NoteIndex() {
    const [notes, setNotes] = useState(null)

    useEffect(() => {
        noteService.query().then(setNotes)
    }, [])
    if (!notes) return <div>loading...</div>
    return (
        <section className="note-index">
            <NoteList notes={notes} />
        </section>
    )
}
