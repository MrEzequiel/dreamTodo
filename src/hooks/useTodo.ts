import { useContext } from 'react'
import { TodoContext } from '../context/TodoListContext'

const useTodo = () => {
  const contextTodo = useContext(TodoContext)
  const { state, dispatch } = contextTodo

  return [ state, dispatch ]
}

export default useTodo
