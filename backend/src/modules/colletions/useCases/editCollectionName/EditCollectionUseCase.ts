import { Collection } from "@prisma/client";
import { client } from "../../../../database/client";
import { AppError } from "../../../../infra/errors/AppError";


interface IRequest {
  id: string
  name: string
  emoji: string
}


export class EditCollectionUseCase {
  async execute({ id, name, emoji }: IRequest): Promise<Collection>{  

    const verifyIfCollectionExist = await client.collection.findFirst({
      where: {
        id
      }
    })

    if(!verifyIfCollectionExist) {
      throw new AppError("Colletion não encontrada!")
    }

    const editedCollection = await client.collection.update({
      where: {
        id,
      },
      data: {
        name,
        emoji 
      },
    })

    return editedCollection
  }
}