import { InMemoryUserRepository } from '../../../../test/repositories/InMemoryUserRepository'
import { CreateUserUseCase } from '../createUser/CreateUserUseCase'
import { EditUserUseCase } from './EditUserUseCase'

const inMemoryUserRepository = new InMemoryUserRepository()
const editUserUseCase = new EditUserUseCase(inMemoryUserRepository)
const createUser = new CreateUserUseCase(inMemoryUserRepository)

describe('Edit user', () => {
  it('should be able to edit a user info', async () => {
    
    await createUser.execute({
      id: 'bf1bb7e5-aa4d-4c4f-8890-239404c2e178',
      name: 'test344',
      email: 'test@test.com',
      password: '1234',
      imageProfile: 'testImage'
    })

    await expect(
      editUserUseCase.execute({
        id: 'bf1bb7e5-aa4d-4c4f-8890-239404c2e178',
        name: 'test1Novo',
        imageProfile: 'Image test'
      })
    ).resolves.not.toThrow()
  })

  it('should not be able to edit a user, if he does not exist', async () => {

    await expect(
      editUserUseCase.execute({
        id: 'IncorretId',
        name: 'test1Novo',
        imageProfile: 'Image test'
      })
    ).rejects.toBeTruthy()
  })
})
