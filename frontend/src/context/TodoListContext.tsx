import React, { createContext, Dispatch, useEffect, useReducer } from 'react'
import { CollectionsActions, todoReducer } from '../functions/reducers'
import ICollection from '../interfaces/Collection'

export type InitialStateType = {
  collections: ICollection[]
}

const getTodosFromLocalStorage = (): ICollection[] => {
  const storage = localStorage.getItem('collections')
  if (storage) {
    const parsedStorage = JSON.parse(storage)
    if (!parsedStorage?.collections?.todos?.complete) {
      localStorage.removeItem('collections')
    }
  }

  return []
}

const initialState = {
  collections: getTodosFromLocalStorage()
}

export const TodoContext = createContext<{
  state: InitialStateType
  dispatch: Dispatch<CollectionsActions>
}>({
  state: initialState,
  dispatch: () => initialState
})

const TodoProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState)

  useEffect(() => {
    localStorage.setItem('collections', JSON.stringify(state.collections))
  }, [state])

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  )
}

export default TodoProvider
