import api from '../../services/api'
import endpoints from '../../services/endpoints'

export const loginUser = async (email: string, password: string) => {
  const response = await api.post(endpoints.user.login, {
    email,
    password
  })
  return response.data
}
