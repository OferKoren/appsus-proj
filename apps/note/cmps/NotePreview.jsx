export function NotePreview({ note }) {
    const { id, createdAt, type, isPinned, style, info } = note
    const { title, txt } = info
    return (
        <section style={style} className="note-preview">
            {title && <h3 className="note-preview-title">{title}</h3>}
            {txt && <p className="re">{txt}</p>}
            {isPinned && <span>pinned</span>}
        </section>
    )
}
