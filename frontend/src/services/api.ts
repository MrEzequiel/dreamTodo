import axios from 'axios'
import Cookies from 'js-cookie'
import { getRefreshToken } from '../functions/User/getRefreshToken'

const baseURL = process.env.REACT_APP_API_URL ?? 'http://localhost:3333'

const api = axios.create({
  baseURL
})

api.interceptors.request.use(async config => {
  const token = Cookies.get('auth')

  if (token) {
    config.headers = {
      Authorization: `Bearer ${token}`,
      ...config.headers
    }
  }

  return config
})

api.interceptors.response.use(
  response => response,
  async error => {
    const prevRequest = error?.config
    if (error?.response?.status === 401 || error?.response?.status === 403) {
      prevRequest.sent = true
      const tokenRefresh = Cookies.get('refresh')
      if (tokenRefresh) {
        const newAccessToken = await getRefreshToken(tokenRefresh)
        Cookies.set('auth', newAccessToken.token)
        Cookies.set('refresh', newAccessToken.refresh.refreshToken)

        prevRequest.headers['Authorization'] = `Bearer ${newAccessToken.token}`
        return api(prevRequest)
      }
    }

    return Promise.reject(error)
  }
)

export default api
