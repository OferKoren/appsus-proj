import { noteService } from '../services/note.service.js'

const { useState, useEffect } = React

export function NoteIndex() {
    const [notes, setNotes] = useState(null)

    useEffect(() => {
        noteService.query().then(setNotes)
    }, [])
    if (!notes) return <div>loading...</div>
    return (
        <section className="note-index">
            <pre>{JSON.stringify(notes, null, 2)}</pre>
        </section>
    )
}
