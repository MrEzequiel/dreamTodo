import { createContext } from 'react'
import ICollection from '../interfaces/Collection'

interface ITodoPageContext {
  id: string
  thisCollection: ICollection
}

const TodoPageContext = createContext<ITodoPageContext>({} as ITodoPageContext)

export default TodoPageContext
