import { AppError } from '../../../../infra/errors/AppError'
import { TodoRepository } from '../../../../repositories/TodoRepositories/todoRepositories'

export interface IEditTodo {
  id: string
  title?: string
  description?: string
}

export class EditTodoUseCase {
  constructor(private todoRepository: TodoRepository) {}
  async execute({ id, title, description }: IEditTodo): Promise<void> {
    const todoExist = await this.todoRepository.findTodoById(id)

    if (!todoExist) {
      throw new AppError('Todo não existente')
    }

    await this.todoRepository.editTodo({
      id,
      title,
      description
    })
  }
}
