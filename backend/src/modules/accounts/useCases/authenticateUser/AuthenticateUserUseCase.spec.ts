import { InMemoryUserRepository } from '../../../../test/repositories/InMemoryUserRepository'
import { CreateUserUseCase } from '../createUser/CreateUserUseCase'
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'

const inMemoryUserRepository = new InMemoryUserRepository()
const createUser = new CreateUserUseCase(inMemoryUserRepository)
const authenticateUser = new AuthenticateUserUseCase(inMemoryUserRepository)

describe('Authenticate user', () => {
  it('should be able to authenticate user', async () => {
    await createUser.execute({
      id: 'bf1bb7e5-aa4d-4c4f-8890-239404c2e178',
      name: 'test1',
      email: 'test@test.com',
      password: '1234',
      imageProfile: 'testImage'
    })

    await expect(
      authenticateUser.execute({
        email: 'test@test.com',
        password: '1234'
      })
    ).resolves.toHaveProperty('token')
  })

  it('should not be able to authenticate user with incorrect password', async () => {
    await expect(
      authenticateUser.execute({
        email: 'test@test.com',
        password: 'incorrectPassword'
      })
    ).rejects.toBeTruthy()
  })

  it('should not be able to authenticate user if he does not exists', async () => {
    await expect(
      authenticateUser.execute({
        email: 'IncorrectEmail',
        password: 'incorrectPassword'
      })
    ).rejects.toBeTruthy()
  })
})
