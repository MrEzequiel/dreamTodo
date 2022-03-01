import api from '../../services/api'
import endpoints from '../../services/endpoints'

export const getCollection = async () => {
  const response = await api.get(endpoints.collections.get)
  return response.data
}
