import { Todo } from "@prisma/client";
import { client } from "../../../../database/client";


interface IRequest {
  id: string
  name: string
  description: string
  isChecked: boolean
}

export class EditTodoUseCase {

  async execute({ id, name, description, isChecked }: IRequest): Promise<Todo> {

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
        isChecked
      },
      where: {
        id: todoExist.id
      }
    })

    return editedTodo;
  }
}