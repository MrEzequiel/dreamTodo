import { client } from "../../../../database/client"
import { AppError } from "../../../../infra/errors/AppError"

export class DeleteColletionUseCase {

  async execute(id: string): Promise<void>{  
    
    const verifyIfColletionExist = await client.colletion.findFirst({
      where: {
        id
      }
    })

    if(!verifyIfColletionExist) {
      throw new AppError("Colletion não encontrada!")
    }

    await client.colletion.delete({
      where: {
        id,
      }
    })
  }
}