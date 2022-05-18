import { Todo } from '@prisma/client'
import { client } from '../../../database/client'
import { ICreateTodoDTO } from '../../../modules/todo/dtos/ICreateTodoDTO'
import { IRequest } from '../../../modules/todo/useCases/editTodo/EditTodoUseCase'
import { TodoRepository } from '../todoRepositories'

export class PrismaTodoRepository implements TodoRepository {
  async createTodo({
    title,
    id_collection,
    description,
    complete
  }: ICreateTodoDTO) {
    const todo = await client.todo.create({
      data: {
        title,
        complete,
        description,
        id_collection
      }
    })

    return todo
  }

  async editTodo({ id, title, description }: IRequest) {
    await client.todo.update({
      data: {
        title,
        description
      },
      where: {
        id
      }
    })
  }

  async deleteTodo(id: string) {
    await client.todo.delete({
      where: {
        id
      }
    })
  }

  async updateCheckTodo(id: string, complete: boolean) {
    const todo = await client.todo.update({
      where: {
        id
      },
      data: {
        complete
      }
    })
  }

  async findTodoByTitle(title: string) {
    const verifyTodoExist = await client.todo.findFirst({
      where: {
        title
      }
    })

    return verifyTodoExist
  }

  async listTodoDate(id_collection: string, modo: string) {
    const todo = await client.todo.findMany({
      where: {
        collection: {
          id: id_collection
        }
      },
      orderBy: {
        created_at: modo.includes('asc') ? 'asc' : 'desc'
      }
    })

    return todo
  }

  async findTodoById(id: string) {
    const verifyTodoExist = await client.todo.findFirst({
      where: {
        id
      }
    })

    return verifyTodoExist
  }
}
