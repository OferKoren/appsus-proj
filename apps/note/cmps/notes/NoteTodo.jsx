const { useState, useEffect } = React
export function NoteTodo({ isEdit, handleChange, note }) {
    const [todoCount, setTodoCount] = useState(1)
    const [todoNote, setTodoNote] = useState({ ...note })
    const [todos, setTodos] = useState([])

    function generateTodos() {
        const todoarr = []
        for (let i = 0; i < todoCount; i++) {
            const todo = <TodoItem key={i + 1} line={i + 1} onChange={handleTodos} />
            todoarr.push(todo)
        }
        return todoarr
    }

    useEffect(() => {
        if (todos.length) {
            const newNote = { ...note }
            newNote.todos = todos
            handleChange({ target: null }, newNote)
        }
    }, [todos])

    function handleTodos({ target }) {
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
            const fieldData = field.split(' ')
            const newField = fieldData[0]
            const idx = fieldData[1]

            const newTodos = [...prevTodos]
            if (!newTodos[idx]) {
                newTodos[idx] = {}
                setTodoCount((prevcount) => prevcount + 1)
            }
            newTodos[idx][newField] = value
            return newTodos
        })
    }

    if (!todoCount) return
    return (
        <React.Fragment>
            {isEdit && (
                <input autoComplete="off" type="text" name="title" id="title" placeholder="title" onChange={handleChange} value={note.title} />
            )}
            {generateTodos()}
        </React.Fragment>
    )
}

function TodoItem({ onChange, line }) {
    return (
        <div key={line} className="todo-item">
            <input onChange={onChange} name={`select ${line - 1}`} type="checkbox" />
            <input onChange={onChange} name={`txt ${line - 1}`} type="text" placeholder="write new todo" />
            <button>x</button>
        </div>
    )
}
