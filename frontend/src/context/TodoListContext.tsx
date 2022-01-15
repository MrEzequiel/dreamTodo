import React, { createContext, Dispatch, useEffect, useReducer } from 'react'
import { TodoActions, todoReducer } from '../functions/reducers'

export type ITodo = {
  id: number
  name: string
  complete: boolean
}

export type InitialStateType = {
  todos: ITodo[]
}

const getTodosFromLocalStorage = (): ITodo[] => {
  const storage = localStorage.getItem('todos')
  if (storage) return JSON.parse(storage)

  return []
}

const initialState = {
  todos: getTodosFromLocalStorage()
}

export const TodoContext = createContext<{
  state: InitialStateType
  dispatch: Dispatch<TodoActions>
}>({
  state: initialState,
  dispatch: () => initialState
})

const TodoProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState)

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state.todos))
  }, [state])

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  )
}

export default TodoProvider
