const { useState, useEffect, useRef } = React
export function NoteImg({ isEdit, handleChange, note }) {
    const inputRef = useRef(null)
    useEffect(() => {
        inputRef.current.click()
    }, [])
    return (
        <section className="note-img">
            {isEdit && (
                <input autoComplete="off" type="text" name="title" id="title" placeholder="title" onChange={handleChange} value={note.title} />
            )}
            <input ref={inputRef} type="file" className="img-input hidden" accept="image/png, image/jpeg, image/gif" />
        </section>
    )
}
