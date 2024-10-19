const { useState, useEffect } = React

export function NotePreview({ notes, note, onUpdateNote }) {
    const { id, createdAt, type, isPinned, style, info } = note
    const { title, txt, url } = info
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
            return (
                <div className="todo-preview" key={`1${todo.id}`}>
                    <span>{todo.txt}</span>
                    <input type="checkbox" name={`doneAt`} checked={!!todo.doneAt} onChange={(ev) => handleTodos(ev, todo)} />
                </div>
            )
        })
    }
}
