import { AxiosRequestConfig } from 'axios'
import api from '../../services/api'
import endpoints from '../../services/endpoints'

interface PostTodoArgs {
  idCollection: string
  name: string
  description?: string | null
}

export const postTodo = async ({
  idCollection,
  name,
  description
}: PostTodoArgs) => {
  const response = await api.post(`${endpoints.todo.post}/${idCollection}`, {
    title: name,
    description: description || null
  })
  return response.data
}
