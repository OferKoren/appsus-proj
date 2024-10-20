const { useState, useEffect } = React

export function NotePreview({ notes, note, onUpdateNote }) {
    const { id, createdAt, type, isPinned, style, info } = note
    const { title, txt, url, videoUrl } = info
    const [todos, setTodos] = useState(info.todos)

    useEffect(() => {}, [todos])

    useEffect(() => {
        setTodos(() => info.todos)
    }, [notes])

    return (
        <section style={style} className="note-preview">
            {title && <h3 className="note-preview-title">{title}</h3>}
            {txt && <p className="note-preview-text">{txt}</p>}
            {url && <img src={url} />}
            {videoUrl && <iframe src={videoUrl} frameBorder="0" style={{ width: '100%' }}></iframe>}
            {todos && <TodosPreview />}
        </section>
    )

    function handleTodos({ target }, todo) {
        const field = target.name
        let value = target.value
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break

            case 'checkbox':
                value = target.checked ? Date.now() : null
                break
        }
        const newTodo = { ...todo, [field]: value }
        const idx = todos.findIndex((todo) => todo.id === newTodo.id)
        const newTodos = [...todos]
        newTodos.splice(idx, 1, newTodo)
        const newNote = { ...note }
        newNote.info.todos = newTodos

        setTodos(() => newTodos)
        onUpdateNote(newNote)
    }

    function TodosPreview() {
        return todos.map((todo) => {
            const emptyboxSrc = './assets/img/notes-icons/empty-box-icon.svg'
            const checkedBoxSrc = './assets/img/notes-icons/checked-box-icon.svg'
            return (
                <div className="todo-preview flex space-between" key={`1${todo.id}`}>
                    <span>{todo.txt}</span>
                    <label
                        htmlFor={todo.id + 'preview'}
                        onClick={(ev) => {
                            ev.stopPropagation()
                        }}
                    >
                        <img src={todo.doneAt ? checkedBoxSrc : emptyboxSrc} alt="" />
                    </label>
                    <input
                        type="checkbox"
                        name={`doneAt`}
                        id={todo.id + 'preview'}
                        checked={!!todo.doneAt}
                        onChange={(ev) => {
                            ev.stopPropagation()
                            handleTodos(ev, todo)
                        }}
                        className="hidden"
                    />
                </div>
            )
        })
    }
}
