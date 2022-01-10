import { useContext } from 'react'
import { TodoListContext } from '../context/TodoListContext'

const useTodo = () => {
  const contextObj = useContext(TodoListContext)
  return contextObj
}

export default useTodo
