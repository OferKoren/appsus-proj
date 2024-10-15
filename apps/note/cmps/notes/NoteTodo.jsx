export function NoteTodo({ isEdit, handleChange, note }) {
    return (
        <section className="note-todo">
            {isEdit && (
                <input autoComplete="off" type="text" name="title" id="title" placeholder="title" onChange={handleChange} value={note.title} />
            )}
            <input type="text" autoComplete="off" name="txt" id="txt" placeholder="write new note..." onChange={handleChange} value={note.txt} />
        </section>
    )
}
