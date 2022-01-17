import { client } from "../../../../database/client";



export class DeleteTodoUseCase {
  async execute(id: string): Promise<void>{
    
    const verifyIfTodoExist = await client.todo.findFirst({
      where: {
        id
      }
    })

    if(!verifyIfTodoExist) {
      throw new Error("Todo não encontrada.")
    }

    await client.todo.delete({
      where: {
        id
      }
    })
  }
}