export function NoteTxt({ isEdit, handleChange, note }) {
    return (
        <React.Fragment>
            {isEdit && (
                <input autoComplete="off" type="text" name="title" id="title" placeholder="title" onChange={handleChange} value={note.info.title} />
            )}
            <input type="text" autoComplete="off" name="txt" id="txt" placeholder="write new note..." onChange={handleChange} value={note.info.txt} />
        </React.Fragment>
    )
}
