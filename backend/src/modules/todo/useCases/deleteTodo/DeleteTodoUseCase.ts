import { client } from "../../../../database/client";
import { AppError } from "../../../../infra/errors/AppError";



export class DeleteTodoUseCase {
  async execute(id: string): Promise<void>{
    
    const verifyIfTodoExist = await client.todo.findFirst({
      where: {
        id
      }
    })

    if(!verifyIfTodoExist) {
      throw new AppError("Todo não encontrada.")
    }

    await client.todo.delete({
      where: {
        id
      }
    })
  }
}