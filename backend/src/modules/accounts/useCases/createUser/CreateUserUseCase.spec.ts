import { InMemoryUserRepository } from '../../../../test/repositories/InMemoryUserRepository'
import { CreateUserUseCase } from './CreateUserUseCase'

const inMemoryUserRepository = new InMemoryUserRepository()
const createUser = new CreateUserUseCase(inMemoryUserRepository)

describe('Create a user', () => {
  it('should be able to create a new user', async () => {
    await expect(
      createUser.execute({
        id: 'bf1bb7e5-aa4d-4c4f-8890-239404c2e178',
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
    ).rejects.toBeTruthy()
  })
})
