import { Colletion } from "@prisma/client";
import { client } from "../../../../database/client";
import { AppError } from "../../../../infra/errors/AppError";


interface IRequest {
  id: string
  name: string
  emoji: string
}


export class EditColletionUseCase {
  async execute({ id, name, emoji }: IRequest): Promise<Colletion>{  

    const verifyIfColletionExist = await client.colletion.findFirst({
      where: {
        id
      }
    })

    if(!verifyIfColletionExist) {
      throw new AppError("Colletion não encontrada!")
    }

    const editedColletion = await client.colletion.update({
      where: {
        id,
      },
      data: {
        name,
        emoji 
      },
    })

    return editedColletion
  }
}