const { useState, useEffect, useRef } = React
export function NoteImg({ isEdit, handleChange, note }) {
    useEffect(() => {}, [])
    console.log(note.info.url)
    return (
        <section className="note-img">
            {isEdit && (
                <input autoComplete="off" type="text" name="title" id="title" placeholder="title" onChange={handleChange} value={note.info.title} />
            )}
            {note.info.url && <img src={note.info.url} />}
        </section>
    )
}
