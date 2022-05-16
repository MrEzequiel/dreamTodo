import { Todo } from '@prisma/client'
import { client } from '../../../../database/client'
import { AppError } from '../../../../infra/errors/AppError'
import { TodoRepository } from '../../../../repositories/TodoRepositories/todoRepositories'

export interface IRequest {
  id: string
  title: string
  description: string
}

export class EditTodoUseCase {
  constructor(private todoRepository: TodoRepository) {}
  async execute({ id, title, description }: IRequest): Promise<Todo> {
    const todoExist = await this.todoRepository.findTodoById(id)

    if (!todoExist) {
      throw new AppError('Todo não existente')
    }

    const editedTodo = await this.todoRepository.editTodo({
      id,
      title,
      description
    })

    return editedTodo
  }
}
