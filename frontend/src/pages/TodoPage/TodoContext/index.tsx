import { createContext, useContext } from 'react'

interface ITodoContext {
  idCollection: string
  collectionName: string
}

const TodoContext = createContext<ITodoContext>({} as ITodoContext)

export const useTodoContext = () => {
  const context = useContext(TodoContext)

  if (!context) {
    throw new Error('useTodoContext must be used within a TodoContext')
  }

  return context
}

export default TodoContext
