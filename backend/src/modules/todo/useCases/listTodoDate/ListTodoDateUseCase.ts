import { client } from '../../../../database/client'
import { AppError } from '../../../../infra/errors/AppError'
import { CollectionRepository } from '../../../../repositories/CollectionRepositories/collectionRepositories'
import { TodoRepository } from '../../../../repositories/TodoRepositories/todoRepositories'

export class ListTodoDateUseCase {
  constructor(
    private colletionRepository: CollectionRepository,
    private todoRepository: TodoRepository
  ) {}
  async execute(id_collection: string, modo: string) {
    const verifyIfColletionExist =
      await this.colletionRepository.findCollectionById(id_collection)

    if (!verifyIfColletionExist) {
      throw new AppError('Colletion não encontrada.')
    }

    const todos = await this.todoRepository.listTodoDate(id_collection, modo)
    
    return todos
  }
}
