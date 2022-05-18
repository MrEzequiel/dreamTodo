import { AppError } from '../../../../infra/errors/AppError'
import { InMemoryCollectionRepository } from '../../../../test/repositories/InMemoryCollectionRepository'
import { InMemoryUserRepository } from '../../../../test/repositories/InMemoryUserRepository'
import { CreateUserUseCase } from '../../../accounts/useCases/createUser/CreateUserUseCase'
import { CreateCollectionUseCase } from '../createCollection/CreateCollectionUseCase'
import { EditCollectionUseCase } from './EditCollectionUseCase'

const inMemoryUserRepository = new InMemoryUserRepository()
const inMemoryCollectionRepository = new InMemoryCollectionRepository()
const createUser = new CreateUserUseCase(inMemoryUserRepository)
const editColletion = new EditCollectionUseCase(inMemoryCollectionRepository)
const createColletion = new CreateCollectionUseCase(
  inMemoryCollectionRepository
)

describe('Edit colletion', () => {
  it('should be able to edit a colletion', async () => {
    const user = await createUser.execute({
      name: 'TestUser',
      email: 'user@test.com',
      password: 'TestPassword',
      imageProfile: 'TestPhotoProfile'
    })

    const collection = await createColletion.execute({
      name: 'TestColletion',
      emoji: 'TestEmoji',
      userId: user.id
    })

    await editColletion.execute({
      id: collection.id,
      name: 'TestColletionAlter',
      emoji: 'TestEmojiAlter'
    })

    expect(collection.name).toEqual('TestColletionAlter')
    expect(collection.emoji).toEqual('TestEmojiAlter')
  })

  it('should not be able to edit a colletion if she does not exist', async () => {
    await expect(
      editColletion.execute({
        id: 'Invalid ID',
        name: 'TestColletionAlterError',
        emoji: 'TestEmojiAlterError'
      })
    ).rejects.toEqual(new AppError('Colletion não encontrada!'))
  })
})
