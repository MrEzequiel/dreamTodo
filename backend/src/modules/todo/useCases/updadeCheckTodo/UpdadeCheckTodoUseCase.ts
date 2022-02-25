import { Todo } from "@prisma/client";
import { client } from "../../../../database/client";
import { AppError } from "../../../../infra/errors/AppError";



export class UpdadeCheckTodoUseCase {

  async execute(id: string, complete: boolean): Promise<Todo>{

    const verifyIfTodoExist = await client.todo.findFirst({
      where: {
        id
      }
    })

    if(!verifyIfTodoExist) throw new AppError('Todo não existente, verifique.');

    const todo = await client.todo.update({
      where: {
        id
      },
      data: {
        complete
      }
    })

    return todo
  }
}