import { utilService } from '../../../../services/util.service.js'
const { useState, useEffect } = React

export function NoteTodo({ isEdit, handleChange, note }) {
    const [todoCount, setTodoCount] = useState(note.info.todos.length + 1)
    const [todos, setTodos] = useState(null)

    useEffect(() => {
        const newEmptyTodo = { txt: '', doneAt: false, id: utilService.makeId() }
        const newTodos = [...note.info.todos, newEmptyTodo]
        const newNote = { ...note, info: { ...note.info, todos: newTodos } }
        setTodos(() => {
            return newTodos
        })
        handleChange({ target: null }, newNote)
    }, [])

    function generateTodos() {
        const elTodoArr = []
        for (let i = 0; i < todoCount; i++) {
            const todo = <TodoItem key={todos[i].id} todo={todos[i]} handleTodos={handleTodos} onDeleteTodo={onDeleteTodo} />
            elTodoArr.push(todo)
        }
        return elTodoArr
    }

    useEffect(() => {
        if (todos && todos.length) {
        }
    }, [todos])

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

        if (idx === todoCount - 1 && newTodos[idx].txt === '') {
            const newEmptyTodo = { txt: '', doneAt: false, id: utilService.makeId() }
            newTodos.push(newEmptyTodo)
            setTodoCount((prevcount) => prevcount + 1)
        }

        newTodos.splice(idx, 1, newTodo)
        const newNote = { ...note }
        newNote.info.todos = [...newTodos]

        setTodos(() => newTodos)
        handleChange({ target: null }, newNote)
    }

    function onDeleteTodo(todoId) {
        const newTodos = todos.filter((todo) => todo.id !== todoId)
        setTodos(() => [...newTodos])
        setTodoCount((prevCount) => prevCount - 1)
    }

    if (!todos) return

    return (
        <React.Fragment>
            {isEdit && (
                <input
                    autoComplete="off"
                    type="text"
                    className="title"
                    name="title"
                    id="title"
                    placeholder="title"
                    onChange={handleChange}
                    value={note.info.title}
                />
            )}
            {generateTodos()}
        </React.Fragment>
    )
}
function TodoItem({ handleTodos, todo, onDeleteTodo }) {
    /* const idx = todos.findIndex((todo) => todo.id === todo.id)
        const todo = todos[idx] */
    const xiconSrc = './assets/img/notes-icons/x-icon.svg'
    const plusiconSrc = './assets/img/notes-icons/plus-icon.svg'
    const emptyboxSrc = './assets/img/notes-icons/empty-box-icon.svg'
    const checkedBoxSex = './assets/img/notes-icons/checked-box-icon.svg'
    return (
        <div key={todo.id} className="todo-item">
            <label htmlFor={todo.id}>
                <img src={todo.doneAt ? checkedBoxSex : emptyboxSrc} alt="" />
            </label>
            <input onChange={(ev) => handleTodos(ev, todo)} name={`doneAt`} id={todo.id} className="hidden" type="checkbox" checked={!!todo.doneAt} />
            <input
                autoComplete="off"
                onChange={(ev) => handleTodos(ev, todo)}
                className="todo-txt-input"
                name={`txt`}
                type="text"
                placeholder="write new todo"
                value={todo.txt}
            />
            {todo.txt ? (
                <button className="todo-x-btn" onClick={() => onDeleteTodo(todo.id)}>
                    <img src={xiconSrc} alt="" />
                </button>
            ) : (
                <span>
                    <img src={plusiconSrc} alt="" />
                </span>
            )}
        </div>
    )
}
