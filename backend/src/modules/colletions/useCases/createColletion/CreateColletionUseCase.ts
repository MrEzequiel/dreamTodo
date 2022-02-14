import { Colletion } from "@prisma/client";
import { client } from "../../../../database/client";
import { AppError } from "../../../../infra/errors/AppError";


export class CreateColletionUseCase {

  async execute(name: string): Promise<Colletion>{

    const verifyIfColletionExist = await client.colletion.findFirst({
      where: {
        name: name
      }
    })

    if(verifyIfColletionExist) {
      throw new AppError("Colletion já existente")
    }

    const colletion = await client.colletion.create({
      data: {
        name,
      },
    })

    return colletion
  }
}