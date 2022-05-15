import { client } from '../../../../database/client'

export class ListCollectionDateUseCase {
  async execute(modo: string) {
    const collection = await client.collection.findMany({
      orderBy: {
        created_at: modo.includes('asc') ? 'asc' : 'desc'
      }
    })

    return collection
  }
}
