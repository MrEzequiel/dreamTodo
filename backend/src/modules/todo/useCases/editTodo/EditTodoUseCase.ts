import { Todo } from "@prisma/client";
import { client } from "../../../../database/client";
import { AppError } from "../../../../infra/errors/AppError";


interface IRequest {
  id: string
  name: string
  description: string
}

export class EditTodoUseCase {

  async execute({ id, name, description }: IRequest): Promise<Todo> {

    const todoExist = await client.todo.findFirst({
      where: {
        id
      }
    })

    if(!todoExist) {
      throw new AppError('Todo não existente')
    }

    const editedTodo = await client.todo.update({
      data: {
        name,
        description,
      },
      where: {
        id: todoExist.id
      },
    })

    return editedTodo;
  }
}