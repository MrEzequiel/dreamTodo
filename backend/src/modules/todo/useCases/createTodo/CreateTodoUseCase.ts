import { Todo } from '@prisma/client'
import { client } from '../../../../database/client'
import { AppError } from '../../../../infra/errors/AppError'
import { TodoRepository } from '../../../../repositories/TodoRepositories/todoRepositories'
import { ICreateTodoDTO } from '../../dtos/ICreateTodoDTO'

export class CreateTodoUseCase {
  constructor(private todoRepository: TodoRepository) {}

  async execute({
    title,
    complete,
    description,
    id_collection
  }: ICreateTodoDTO): Promise<Todo> {
    const verifyTodoExist = await this.todoRepository.findTodoByTitle(title)

    if (verifyTodoExist) {
      throw new AppError('Todo já existe!')
    }

    const todo = await this.todoRepository.createTodo({
      title,
      complete,
      description,
      id_collection
    })

    return todo
  }
}
