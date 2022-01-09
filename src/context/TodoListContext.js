import { createContext, useReducer } from 'react'

export const TodoListContext = createContext()

function newTodo(name) {
  return { id: Date.now(), name, complete: false }
}

function reducer(todos, action) {
  switch (action.types) {
    case ACTIONS.ADD_TODO:
      return [newTodo(action.payload.name), ...todos]
    default:
      return todos
  }
}

const ACTIONS = {
  ADD_TODO: 'add-todo'
}

function TodoListProvider({ children }) {
  const [todos, dispatch] = useReducer(reducer, [])

  return (
    <TodoListContext.Provider value={{ todos, dispatch, ACTIONS }}>
      {children}
    </TodoListContext.Provider>
  )
}

export default TodoListProvider
