import { InMemoryCollectionRepository } from '../../../../test/repositories/InMemoryCollectionRepository'
import { InMemoryUserRepository } from '../../../../test/repositories/InMemoryUserRepository'
import { CreateUserUseCase } from '../../../accounts/useCases/createUser/CreateUserUseCase'
import { CreateCollectionUseCase } from '../createCollection/CreateCollectionUseCase'
import { DeleteCollectionUseCase } from './DeleteCollectionUseCase'

const inMemoryCollectionRepository = new InMemoryCollectionRepository()
const inMemoryUserRepository = new InMemoryUserRepository()
const createUser = new CreateUserUseCase(inMemoryUserRepository)
const deleteColletion = new DeleteCollectionUseCase(
  inMemoryCollectionRepository
)
const createColletion = new CreateCollectionUseCase(
  inMemoryCollectionRepository
)

describe('Delete a colletion', () => {
  it('should be able to delete a colletion', async () => {
    const user = await createUser.execute({
      name: 'TestUser',
      email: 'TestUser@test.com',
      password: 'TestPasswordUser',
      imageProfile: 'TestPhotoUser'
    })

    const collection = await createColletion.execute({
      name: 'TestCollectionName',
      emoji: ':TestCollectionEmoji:',
      userId: user.id
    })

    
    
    
  })
})
