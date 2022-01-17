import { Colletion } from "@prisma/client";
import { client } from "../../../../database/client";


interface IRequest {
  id: string
  name: string
}


export class EditColletionUseCase {
  async execute({ id, name }: IRequest): Promise<Colletion>{  

    const verifyIfColletionExist = await client.colletion.findFirst({
      where: {
        id
      }
    })

    if(!verifyIfColletionExist) {
      throw new Error("Colletion não encontrada!")
    }

    const editedColletion = await client.colletion.update({
      where: {
        id
      },
      data: {
        name
      }
    })

    return editedColletion
  }
}