import { Todo } from "@prisma/client";
import { client } from "../../../../database/client";


interface IRequest {
  id: string
  name: string
  description: string
  complete: boolean
}

export class EditTodoUseCase {

  async execute({ id, name, description, complete }: IRequest): Promise<Todo> {

    const todoExist = await client.todo.findFirst({
      where: {
        id
      }
    })

    if(!todoExist) {
      throw new Error('Todo não existente')
    }

    const editedTodo = await client.todo.update({
      data: {
        name,
        description,
        complete
      },
      where: {
        id: todoExist.id
      }
    })

    return editedTodo;
  }
}