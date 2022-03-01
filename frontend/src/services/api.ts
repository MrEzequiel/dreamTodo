import axios from 'axios'
import Cookies from 'js-cookie'

const baseURL = process.env.REACT_APP_API_URL ?? 'http://localhost:3333'

const api = axios.create({
  baseURL
})

api.interceptors.request.use(async config => {
  const token = Cookies.get('auth')

  if (token) {
    config.headers = { Authorization: token }
  }

  return config
})

export default api
