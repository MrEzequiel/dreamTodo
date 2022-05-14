import { AxiosRequestConfig } from 'axios'
import api from '../../services/api'
import endpoints from '../../services/endpoints'

interface PostTodoArgs {
  idCollection: string
  name: string
}

export const postTodo = async ({ idCollection, name }: PostTodoArgs) => {
  const response = await api.post(`${endpoints.todo.post}/${idCollection}`, {
    title: name
  })
  return response.data
}
