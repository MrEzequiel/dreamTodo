import { client } from "../../../../database/client";

export class ListColletionByDateUseCase {

  async execute(){
    const colletion = await client.colletion.findMany({
      orderBy: {
        created_at: 'asc'
      }
    });

    return colletion
  }
}