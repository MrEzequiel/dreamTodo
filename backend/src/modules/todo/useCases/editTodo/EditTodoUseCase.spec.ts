import { AppError } from '../../../../infra/errors/AppError'
import { InMemoryCollectionRepository } from '../../../../test/repositories/InMemoryCollectionRepository'
import { InMemoryTodoRepository } from '../../../../test/repositories/inMemoryTodoRepository'
import { InMemoryUserRepository } from '../../../../test/repositories/InMemoryUserRepository'
import { CreateUserUseCase } from '../../../accounts/useCases/createUser/CreateUserUseCase'
import { CreateCollectionUseCase } from '../../../colletions/useCases/createCollection/CreateCollectionUseCase'
import { CreateTodoUseCase } from '../createTodo/CreateTodoUseCase'
import { EditTodoUseCase } from './EditTodoUseCase'

const inMemoryUserRepository = new InMemoryUserRepository()
const inMemoryCollectionRepository = new InMemoryCollectionRepository()
const inMemoryTodoRepository = new InMemoryTodoRepository()
const createUser = new CreateUserUseCase(inMemoryUserRepository)
const createCollection = new CreateCollectionUseCase(
  inMemoryCollectionRepository
)
const createTodo = new CreateTodoUseCase(inMemoryTodoRepository)
const editTodo = new EditTodoUseCase(inMemoryTodoRepository)

describe('Edit a todo', () => {
  it('should be able to edit a todo', async () => {
    const user = await createUser.execute({
      name: 'test2',
      email: 'test2@test',
      password: 'test2',
      imageProfile: 'test2ProfileImage'
    })

    const collection = await createCollection.execute({
      name: 'TestCollection',
      emoji: ':TestEmojiCollection:',
      userId: user.id
    })

    const todo = await createTodo.execute({
      title: 'Test Title',
      description: 'Test Description',
      complete: false,
      id_collection: collection.id
    })

    await editTodo.execute({
      id: todo.id,
      title: 'Test'
    })

    expect(todo.title).toEqual('Test')
  })

  it('should not be able to edit a todo if she does not exist', async () => {
    const user = await createUser.execute({
      name: 'testTodoEdit',
      email: 'testTodoEdit@test',
      password: 'test2',
      imageProfile: 'test2ProfileImage'
    })

    const collection = await createCollection.execute({
      name: 'TestCollection2',
      emoji: ':TestEmojiCollection2:',
      userId: user.id
    })

    const todo = await createTodo.execute({
      title: 'Test Title',
      description: 'Test Description',
      complete: false,
      id_collection: collection.id
    })

    await expect(
      editTodo.execute({
        id: 'Invalid ID',
        title: 'Test Title Error',
        description: 'Test Description Error'
      })
    ).rejects.toEqual(new AppError('Todo não existente'))
  })
})
