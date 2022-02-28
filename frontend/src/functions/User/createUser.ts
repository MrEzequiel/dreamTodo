import api from '../../services/api'

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID_GOOGLE

interface ICreateUserData {
  email: string
  password: string
  name?: string
  imageURL?: string
}

export const createUser = async (data: FormData) => {
  const response = await api.post('/user', data)
  return response.data
}

export const loginWithGoogle = async (token: string) => {
  const response = await api.post(`/login/google/${CLIENT_ID}/${token}`)
  return response.data
}
