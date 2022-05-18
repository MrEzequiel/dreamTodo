import { AppError } from '../../../../infra/errors/AppError'
import { InMemoryCollectionRepository } from '../../../../test/repositories/InMemoryCollectionRepository'
import { InMemoryTodoRepository } from '../../../../test/repositories/inMemoryTodoRepository'
import { InMemoryUserRepository } from '../../../../test/repositories/InMemoryUserRepository'
import { CreateUserUseCase } from '../../../accounts/useCases/createUser/CreateUserUseCase'
import { CreateCollectionUseCase } from '../../../colletions/useCases/createCollection/CreateCollectionUseCase'
import { CreateTodoUseCase } from './CreateTodoUseCase'

const inMemoryUserRepository = new InMemoryUserRepository()
const inMemoryCollectionRepository = new InMemoryCollectionRepository()
const inMemoryTodoRepository = new InMemoryTodoRepository()
const createCollection = new CreateCollectionUseCase(
  inMemoryCollectionRepository
)
const createTodo = new CreateTodoUseCase(inMemoryTodoRepository)
const createUser = new CreateUserUseCase(inMemoryUserRepository)

describe('Create todo', () => {
  it('should be able to create a new todo', async () => {
    const user = await createUser.execute({
      name: 'test',
      email: 'test@test',
      password: 'test',
      imageProfile: 'testProfileImage'
    })

    const collection = await createCollection.execute({
      name: 'Test Collection',
      emoji: ':TestEmoji:',
      userId: user.id
    })

    const todo = await createTodo.execute({
      title: 'Test Todo',
      complete: false,
      description: 'Test Todo description',
      id_collection: collection.id
    })

    expect(todo).toHaveProperty('id')
  })

  it('should not be able to create a new todo if she already exist', async () => {
    const user = await createUser.execute({
      name: 'test2',
      email: 'test2@test',
      password: 'test2',
      imageProfile: 'test2ProfileImage'
    })

    const collection = await createCollection.execute({
      name: 'Test Collection 2',
      emoji: ':TestEmoji:',
      userId: user.id
    })

    await createTodo.execute({
      title: 'Test Todo2',
      complete: false,
      description: 'Test Todo description',
      id_collection: collection.id
    })

    await expect(
      createTodo.execute({
        title: 'Test Todo2',
        complete: false,
        description: 'Test Todo description',
        id_collection: collection.id
      })
    ).rejects.toEqual(new AppError('Todo já existe!'))
  })
})
