import { Colletion } from "@prisma/client";
import { client } from "../../../../database/client";


export class CreateColletionUseCase {

  async execute(name: string): Promise<Colletion>{

    const colletion = await client.colletion.create({
      data: {
        name
      },
      include: {
        todo: true
      }
    })

    return colletion
  }
}