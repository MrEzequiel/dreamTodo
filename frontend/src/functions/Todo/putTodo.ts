import { AxiosRequestConfig } from 'axios'
import api from '../../services/api'
import endpoints from '../../services/endpoints'

interface PutTodoArgs {
  idCollection: string
  idTodo: string
  name: string
  description?: string | null
}

export const pustTodo = async ({
  idCollection,
  name,
  description,
  idTodo
}: PutTodoArgs) => {
  const response = await api.put(`${endpoints.todo.put}/${idCollection}`, {
    id: idTodo,
    name: name,
    description: description || null
  })
  return response.data
}
