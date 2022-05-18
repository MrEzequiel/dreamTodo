import api from '../../services/api'
import endpoints from '../../services/endpoints'

export const getIndividualCollection = async (name: string) => {
  const response = await api.get(endpoints.todo.get + '/' + name, {
    params: {
      complete: ''
    }
  })
  return response.data
}
