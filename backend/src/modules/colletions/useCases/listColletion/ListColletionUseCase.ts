import { Colletion } from "@prisma/client";
import { client } from "../../../../database/client";



export class ListColletionUseCase {

  async execute(user_id: string): Promise<Object>{

    const colletions = await client.colletion.findMany({
      where: {
        userId: user_id
      },
      select: {
        id: true,
        name: true,
        Todo: true
      },
    })

    return colletions
  }
}