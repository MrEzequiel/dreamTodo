import api from '../../services/api'

interface ICreateUserData {
  email: string
  password: string
  name?: string
  imageURL?: string
}

const createUser = async (data: ICreateUserData) => {
  const response = await api.post('/user', data)
  return response.data
}

export default createUser
