import api from '../../services/api'
import endpoints from '../../services/endpoints'

export const putUser = async (data: FormData) => {
  const response = await api.put(endpoints.user.modify, data)
  return response.data
}
