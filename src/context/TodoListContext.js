import { createContext, useEffect, useReducer } from 'react'

export const TodoListContext = createContext()

function newTodo(name) {
  return { id: Date.now(), name, complete: false }
}

function removeTodoFromId(id, todos) {
  return todos.filter(todo => id !== todo.id)
}

function reducer(todos, action) {
  switch (action.types) {
    case ACTIONS.ADD_TODO:
      return [newTodo(action.payload.name), ...todos]

    case ACTIONS.TOGGLE_TODO:
      // find todo complete and toggle complete
      let todoToggle = todos.find(todo => action.payload.id === todo.id)
      todoToggle = { ...todoToggle, complete: !todoToggle.complete }

      // if there is only one task, the other procedures are unnecessary.
      if (todos.length === 1) return [todoToggle]

      // removing to do you changed and adding to the first item in the array
      todos = removeTodoFromId(action.payload.id, todos)
      todos.unshift(todoToggle)
      return todos

    case ACTIONS.REMOVE_TODO:
      return removeTodoFromId(action.payload.id, todos)

    case ACTIONS.EDIT_TODO:
      return todos.map(todo => {
        if (todo.id !== action.payload.id) return todo

        return { ...todo, name: action.payload.name }
      })

    default:
      return todos
  }
}

const getTodoFromLocalStorage = () => {
  const storageValue = localStorage.getItem('key')

  return storageValue ? JSON.parse(storageValue) : []
}

const ACTIONS = {
  ADD_TODO: 'add-todo',
  TOGGLE_TODO: 'toggle-todo',
  REMOVE_TODO: 'remove-todo',
  EDIT_TODO: 'edit-todo'
}

function TodoListProvider({ children }) {
  const [todos, dispatch] = useReducer(reducer, getTodoFromLocalStorage())

  useEffect(() => {
    localStorage.setItem('key', JSON.stringify(todos))
  }, [todos])

  return (
    <TodoListContext.Provider value={{ todos, dispatch, ACTIONS }}>
      {children}
    </TodoListContext.Provider>
  )
}

export default TodoListProvider
