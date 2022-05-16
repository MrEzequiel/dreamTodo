import { client } from '../../../../database/client'
import { AppError } from '../../../../infra/errors/AppError'
import { TodoRepository } from '../../../../repositories/TodoRepositories/todoRepositories'

export class DeleteTodoUseCase {
  constructor(private todoRepository: TodoRepository) {}
  async execute(id: string): Promise<void> {
    const verifyIfTodoExist = await this.todoRepository.findTodoById(id)

    if (!verifyIfTodoExist) {
      throw new AppError('Todo não encontrada.')
    }

    await this.todoRepository.deleteTodo(id)
  }
}
