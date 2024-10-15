const { useState, useEffect } = React
export function NotePreview({ note, onUpdateNote }) {
    const { id, createdAt, type, isPinned, style, info } = note
    const { title, txt } = info
    const [todos, setTodos] = useState(info.todos)
    useEffect(() => {
        if (todos) {
            const newNote = { ...note }
            newNote.todos = todos
            onUpdateNote(newNote)
        }
    }, [todos])
    return (
        <section style={style} className="note-preview">
            {title && <h3 className="note-preview-title">{title}</h3>}
            {txt && <p className="re">{txt}</p>}
            {todos && <TodosPreview />}
        </section>
    )

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break

            case 'checkbox':
                value = target.checked
                break
        }

        setTodos((prevTodos) => {
            console.log(prevTodos)
            const fieldData = field.split(' ')
            const newField = fieldData[0]
            const idx = fieldData[1]
            console.log(newField)
            console.log(idx)
            const newTodos = [...prevTodos]
            if (!newTodos[idx]) {
                newTodos[idx] = {}
                setTodoCount((prevcount) => prevcount + 1)
            }
            newTodos[idx][newField] = value
            return newTodos
        })
    }
    function TodosPreview() {
        return todos.map((todo, idx) => {
            return (
                <div className="todo-preview" key={idx}>
                    <span>{todo.txt}</span>
                    <input type="checkbox" name={`select ${idx}`} checked={todo.select} onChange={handleChange} />
                </div>
            )
        })
    }
}
