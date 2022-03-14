import { Collection } from "@prisma/client";
import { client } from "../../../../database/client";



export class ListCollectionUseCase {

  async execute(user_id: string): Promise<Object>{

    const collections = await client.collection.findMany({
      where: {
        userId: user_id,
      },
      select: {
        id: true,
        name: true,
        emoji: true,
        Todo: true,
        created_at: true,
        modified_at: true
      },
      orderBy: {
        modified_at: 'asc'
      }
    })

    return collections
  }
}