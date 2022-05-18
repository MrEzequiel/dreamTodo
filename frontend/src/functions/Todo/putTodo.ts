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
