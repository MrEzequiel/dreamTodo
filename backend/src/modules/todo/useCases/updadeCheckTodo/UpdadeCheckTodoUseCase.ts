import { Todo } from '@prisma/client'
import { client } from '../../../../database/client'
import { AppError } from '../../../../infra/errors/AppError'
import { TodoRepository } from '../../../../repositories/TodoRepositories/todoRepositories'

export class UpdadeCheckTodoUseCase {
  constructor(private todoRepository: TodoRepository) {}
  async execute(id: string, complete: boolean): Promise<void> {
    const verifyIfTodoExist = await this.todoRepository.findTodoById(id)

    if (!verifyIfTodoExist) throw new AppError('Todo não existente, verifique.')

    await this.todoRepository.updateCheckTodo(id, complete)
  }
}
