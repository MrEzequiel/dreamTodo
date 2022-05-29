import { AppError } from '../../../../infra/errors/AppError'
import { InMemoryMailProvider } from '../../../../test/repositories/InMemoryMailProvider'
import { InMemoryUserRepository } from '../../../../test/repositories/InMemoryUserRepository'
import { CreateUserUseCase } from '../createUser/CreateUserUseCase'
import { SendMailForgotPasswordUseCase } from './SendMailForgotPasswordUseCase'

const inMemoryUserRepository = new InMemoryUserRepository()
const createUser = new CreateUserUseCase(inMemoryUserRepository)
const mailProvider = new InMemoryMailProvider()
const sendMailForgotPassword = new SendMailForgotPasswordUseCase(
  inMemoryUserRepository,
  mailProvider
)

describe('Send mail forgot password', () => {
  it('should be able to send mail for user reset his password', async () => {
    const sendMail = jest.spyOn(mailProvider, 'sendMail')

    const user = await createUser.execute({
      name: 'TestEmail',
      email: 'TestEmail@test.com',
      password: 'TestEmail',
      imageProfile: 'TestEmailImage'
    })

    await sendMailForgotPassword.execute(user.email)

    expect(sendMail).toHaveBeenCalled()
  })

  it('should not be able to send a email if user does not exist', async () => {
    await expect(
      sendMailForgotPassword.execute('emailIncorrect')
    ).rejects.toEqual(new AppError('Usuario não encontrado, tente novamente.'))
  })

  it('should be able when email send to return token to user', async () => {
    const user = await createUser.execute({
      name: 'TestToken',
      email: 'TestToken@test.com',
      password: 'TestToken',
      imageProfile: 'TestTokenImage'
    })

    const token = await sendMailForgotPassword.execute(user.email)
    expect(token).toHaveProperty('token')
  })
})
