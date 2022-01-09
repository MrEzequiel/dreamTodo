import { createContext, useReducer } from 'react'

export const TodoListContext = createContext()

function newTodo(name) {
  return { id: Date.now(), name, complete: false }
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
      todos = todos.filter(todo => action.payload.id !== todo.id)
      todos.unshift(todoToggle)
      return todos

    default:
      return todos
  }
}

const ACTIONS = {
  ADD_TODO: 'add-todo',
  TOGGLE_TODO: 'toggle-todo'
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
