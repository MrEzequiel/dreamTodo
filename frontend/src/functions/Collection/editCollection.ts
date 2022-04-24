import api from '../../services/api'
import endpoints from '../../services/endpoints'

export const putCollection = async (data: {
  idCollection: string
  name: string
  emoji: string
}) => {
  const response = await api.put(
    endpoints.collections.put + '/' + data.idCollection,
    {
      name: data.name,
      emoji: data.emoji
    }
  )
  return response.data
}
