import { AxiosRequestConfig } from 'axios'
import api from '../../services/api'
import endpoints from '../../services/endpoints'

interface PutTodoArgs {
  idTodo: string
  name: string
  description?: string | null
}

export const putTodo = async ({ idTodo, name, description }: PutTodoArgs) => {
  const response = await api.put(`${endpoints.todo.put}/${idTodo}`, {
    name: name,
    description: description || null
  })
  return response.data
}

interface PutTodoCompleteArgs {
  idTodo: string
  completed: boolean
}

export const putCompletedTodo = async ({
  idTodo,
  completed
}: PutTodoCompleteArgs) => {
  const response = await api.put(`${endpoints.todo.put}/${idTodo}`, {
    complete: completed
  })
  return response.data
}
