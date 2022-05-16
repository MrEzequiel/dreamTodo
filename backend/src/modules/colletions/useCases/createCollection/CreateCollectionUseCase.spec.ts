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
      id: '02cb8115-30d1-47b3-bcdb-54828ee3a80d',
      name: 'TestC',
      email: 'TestC@test.com',
      password: 'TestC',
      imageProfile: 'TestC'
    })

    const colletion = await createCollection.execute({
      name: 'TestColletion',
      emoji: ':TestColletionEmoji:',
      userId: '02cb8115-30d1-47b3-bcdb-54828ee3a80d',
    })

    expect(colletion).toHaveProperty('id');
  })
})
