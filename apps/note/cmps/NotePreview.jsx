const { useState, useEffect } = React
import { deepCopy } from '../../../services/util.service.js'
export function NotePreview({ notes, note, onUpdateNote }) {
    const { id, createdAt, type, isPinned, style, info } = deepCopy(note)
    const { title, txt } = info
    const [todos, setTodos] = useState(info.todos)

    useEffect(() => {}, [todos])

    useEffect(() => {
        setTodos(() => info.todos)
    }, [notes])
    if (todos && todos.length) console.log(todos.length)
    return (
        <section style={style} className="note-preview">
            {title && <h3 className="note-preview-title">{title}</h3>}
            {txt && <p className="re">{txt}</p>}
            {todos && <TodosPreview />}
        </section>
    )

    /* function handleChange({ target }) {
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
    } */

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

        setTodos((prevTodos) => {
            const newTodo = { ...todo, [field]: value }
            const idx = todos.findIndex((todo) => todo.id === newTodo.id)
            const newTodos = [...prevTodos]

            newTodos.splice(idx, 1, newTodo)

            const newNote = { ...note }
            newNote.info.todos = newTodos
            onUpdateNote(newNote)
            return newTodos
        })
    }

    function TodosPreview() {
        return todos.map((todo) => {
            console.log(!!todo.doneAt)
            return (
                <div className="todo-preview" key={`1${todo.id}`}>
                    <span>{todo.txt}</span>
                    <input type="checkbox" name={`doneAt`} checked={!!todo.doneAt} onChange={(ev) => handleTodos(ev, todo)} />
                </div>
            )
        })
    }
}
