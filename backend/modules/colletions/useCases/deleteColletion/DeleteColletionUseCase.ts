import { client } from "../../../../database/client"


interface IRequest {
  id: string
}


export class DeleteColletionUseCase {
  async execute({ id }: IRequest){  
    
    const verifyIfColletionExist = await client.colletion.findFirst({
      where: {
        id
      }
    })

    if(!verifyIfColletionExist) {
      throw new Error("Colletion não encontrada!")
    }

    await client.colletion.delete({
      where: {
        id
      }
    })
  }
}