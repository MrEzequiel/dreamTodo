import api from '../../services/api'

export const loginUser = async (email: string, password: string) => {
  const response = await api.post('/login', {
    email,
    password
  })
  return response.data
}
