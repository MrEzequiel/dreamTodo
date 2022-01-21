
import { client } from "../../../../database/client"
import { AppError } from "../../../../infra/errors/AppError"


interface IRequest {
  id: string
}


export class DeleteColletionUseCase {
  async execute({ id }: IRequest): Promise<void>{  
    
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
        id
      }
    })
  }
}