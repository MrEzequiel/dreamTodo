import api from '../../services/api'

export const getCollection = async () => {
  const response = await api.get('/colletion')
  return response.data
}
