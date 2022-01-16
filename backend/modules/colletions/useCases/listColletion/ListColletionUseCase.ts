import { client } from "../../../../database/client";



export class ListColletionUseCase {

  async execute(){

    const colletions = await client.colletion.findMany({
      select: {
        id: true,
        name: true
      }
    })

    return colletions
  }
}