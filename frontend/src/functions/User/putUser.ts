import { AxiosRequestConfig } from 'axios'
import api from '../../services/api'
import endpoints from '../../services/endpoints'

type putUserType = (params: {
  data: FormData
  options?: AxiosRequestConfig
}) => Promise<any>

export const putUser: putUserType = async ({ data, options }) => {
  const response = await api.put(endpoints.user.modify, data, options)
  return response.data
}
