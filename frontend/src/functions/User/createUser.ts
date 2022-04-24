import api from '../../services/api'
import endpoints from '../../services/endpoints'

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID_GOOGLE

if (!CLIENT_ID || CLIENT_ID.trim() === '') {
  throw new Error('Missing client google id in .env file')
}

interface ICreateUserData {
  email: string
  password: string
  name?: string
  imageURL?: string
}

export const createUser = async (data: FormData) => {
  const response = await api.post(endpoints.user.create, data)
  return response.data
}

export const loginWithGoogle = async (token: string) => {
  const response = await api.post(
    endpoints.user.loginWithGoogle(CLIENT_ID, token)
  )
  return response.data
}
