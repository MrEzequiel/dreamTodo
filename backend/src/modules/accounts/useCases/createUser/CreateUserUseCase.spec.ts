import { AppError } from '../../../../infra/errors/AppError'
import { InMemoryUserRepository } from '../../../../test/repositories/InMemoryUserRepository'
import { CreateUserUseCase } from './CreateUserUseCase'

const inMemoryUserRepository = new InMemoryUserRepository()
const createUser = new CreateUserUseCase(inMemoryUserRepository)

describe('Create a user', () => {
  it('should be able to create a new user', async () => {
    await expect(
      createUser.execute({
        name: 'test1',
        email: 'test@test.com',
        password: '1234',
        imageProfile: 'testImage'
      })
    ).resolves.not.toThrow()
  })

  it('should not be able to create a user if he already exist', async () => {
    await expect(
      createUser.execute({
        name: 'test2',
        email: 'test@test.com',
        password: '1235',
        imageProfile: 'testImage'
      })
    ).rejects.toEqual(new AppError("Esse usuário já existe", 400))
  })
})
