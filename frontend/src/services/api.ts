import axios from 'axios'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'
import { IUser } from '../context/UserContext'
import { getRefreshToken } from '../functions/User/getRefreshToken'

const baseURL = process.env.REACT_APP_API_URL ?? 'http://localhost:3333'

const api = axios.create({
  baseURL
})

api.interceptors.request.use(async config => {
  let token = Cookies.get('auth')
  let refreshToken = Cookies.get('refresh')
  const decodeRefreshToken: null | {
    exp: number
    iat: number
    sub: string
  } = refreshToken ? jwtDecode(refreshToken) : null

  if (decodeRefreshToken && refreshToken) {
    const now = Math.floor(new Date().getTime() / 1000)
    const exp = decodeRefreshToken.exp

    if (now > exp) {
      const newRefreshToken: IUser = await getRefreshToken(refreshToken)
      Cookies.set('refresh', newRefreshToken.refresh.refreshToken)
      Cookies.set('auth', newRefreshToken.token)

      token = newRefreshToken.token
    }
  }

  config.headers = {
    Authorization: `Bearer ${token}`,
    ...config.headers
  }

  return config
})

export default api
