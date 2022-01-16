import { client } from "../../../../database/client";



export class ListColletionUseCase {

  async execute(colletionId: string) {

    const colletions = await client.colletion.findMany({
      where: {
        id: colletionId
      },
      include: {
        todo: true
      }
    })

    return colletions
  }
}