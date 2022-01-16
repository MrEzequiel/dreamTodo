import { Colletion } from "@prisma/client";
import { client } from "../../../../database/client";


export class CreateColletionUseCase {

  async execute(name: string): Promise<Colletion>{

    const verifyIfColletionExist = await client.colletion.findFirst({
      where: {
        name: name
      }
    })

    if(verifyIfColletionExist) {
      throw new Error("Colletion já existente")
    }

    const colletion = await client.colletion.create({
      data: {
        name
      },
    })

    return colletion
  }
}