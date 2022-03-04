import { client } from "../../../../database/client"
import { AppError } from "../../../../infra/errors/AppError"

export class DeleteCollectionUseCase {

  async execute(id: string): Promise<void>{  
    
    const verifyIfColletionExist = await client.collection.findFirst({
      where: {
        id
      }
    })

    if(!verifyIfColletionExist) {
      throw new AppError("Colletion não encontrada!")
    }

    await client.collection.delete({
      where: {
        id,
      }
    })
  }
}