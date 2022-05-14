import React, { createContext, Dispatch, useEffect, useReducer } from 'react'
import { CollectionsActions, todoReducer, Types } from '../functions/reducers'
import ICollection from '../interfaces/Collection'
import { useAuth } from './UserContext'

export type InitialStateType = {
  collections: ICollection[]
}

const getTodosFromLocalStorage = (): ICollection[] => {
  const storage = localStorage.getItem('collections')
  if (storage) {
    const parsedStorage = JSON.parse(storage)
    if (!parsedStorage[0] || parsedStorage[0].todo?.complete) {
      localStorage.removeItem('collections')
    } else {
      return parsedStorage
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
  const { isUser } = useAuth()
  const [state, dispatch] = useReducer(todoReducer, initialState)

  useEffect(() => {
    if (isUser) {
      dispatch({ type: Types.Clear })
    }
  }, [isUser])

  useEffect(() => {
    if (isUser) {
      return
    }
    localStorage.setItem('collections', JSON.stringify(state.collections))
  }, [state, isUser])

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  )
}

export default TodoProvider
