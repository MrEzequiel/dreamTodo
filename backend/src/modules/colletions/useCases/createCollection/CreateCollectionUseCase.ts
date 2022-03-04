import { Collection } from "@prisma/client";
import { client } from "../../../../database/client";
import { AppError } from "../../../../infra/errors/AppError";


export class CreateCollectionUseCase {

  async execute(userId: string, name: string, emoji: string): Promise<Collection>{

    const verifyIfCollectionExist = await client.collection.findFirst({
      where: {
        name: name
      }
    })

    if(verifyIfCollectionExist) {
      throw new AppError("Colletion já existente")
    }

    const colletion = await client.collection.create({
      data: {
        userId,
        name,
        emoji
      }
    })

    return colletion
  }
}