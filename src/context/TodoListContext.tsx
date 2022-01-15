import React, { createContext, Dispatch, useReducer } from 'react'
import { TodoActions, todoReducer } from '../functions/reducers'

export type ITodo = {
  id: number;
  name: string;
  complete: boolean;
}

export type InitialStateType = {
  todos: ITodo[]
}

const initialState = {
  todos: []
}

export const TodoContext = createContext<{
  state: InitialStateType
  dispatch: Dispatch<TodoActions>
}>({
  state: initialState,
  dispatch: () => initialState
})

const TodoProvider: React.FC = ({ children }) => {
  const [ state, dispatch ] = useReducer(todoReducer, initialState)

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  )
}

export default TodoProvider