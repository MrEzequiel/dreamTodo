import api from '../../services/api'
import endpoints from '../../services/endpoints'

const sendEmailForForgotPassword = async (email: string) => {
  const response = await api.post(endpoints.user.forgotPassword, { email })
  return response.data
}

export default sendEmailForForgotPassword
