import { AppError } from '../../../../infra/errors/AppError'
import { InMemoryCollectionRepository } from '../../../../test/repositories/InMemoryCollectionRepository'
import { InMemoryUserRepository } from '../../../../test/repositories/InMemoryUserRepository'
import { CreateUserUseCase } from '../../../accounts/useCases/createUser/CreateUserUseCase'
import { CreateCollectionUseCase } from './CreateCollectionUseCase'

const inMemoryCollectionRepository = new InMemoryCollectionRepository()
const createCollection = new CreateCollectionUseCase(
  inMemoryCollectionRepository
)
const inMemoryUserRepository = new InMemoryUserRepository()
const createUser = new CreateUserUseCase(inMemoryUserRepository)

describe('Create a collection', () => {
  it('should be able to create a new collection', async () => {
    await createUser.execute({
      id: '4dc58088-f3c3-4f83-8cf9-ae879f28a2bf',
      name: 'TestC',
      email: 'TestC@test.com',
      password: 'TestC',
      imageProfile: 'TestC'
    })

    const colletion = await createCollection.execute({
      name: 'TestColletion',
      emoji: ':TestColletionEmoji:',
      userId: '4dc58088-f3c3-4f83-8cf9-ae879f28a2bf'
    })

    expect(colletion).toHaveProperty('id')
  })

  it('should not be able to create a new colletion if he already exist', async () => {
    await expect(
      createCollection.execute({
        name: 'TestColletion',
        emoji: ':TestColletionEmoji:',
        userId: '4dc58088-f3c3-4f83-8cf9-ae879f28a2bf'
      })
    ).rejects.toEqual(new AppError('Collection já existe'))
  })
})
