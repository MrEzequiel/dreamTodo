import api from '../../services/api'
import endpoints from '../../services/endpoints'

export const postCollection = async (data: { name: string; emoji: string }) => {
  const response = await api.post(endpoints.collections.post, data)
  return response.data
}
