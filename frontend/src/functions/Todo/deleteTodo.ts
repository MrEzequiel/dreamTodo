import { AxiosRequestConfig } from 'axios'
import api from '../../services/api'
import endpoints from '../../services/endpoints'

interface DeleteTodoArgs {
  idTodo: string
}

export const deleteTodo = async ({ idTodo }: DeleteTodoArgs) => {
  const response = await api.delete(`${endpoints.todo.delete}/${idTodo}`)
  return response.data
}
