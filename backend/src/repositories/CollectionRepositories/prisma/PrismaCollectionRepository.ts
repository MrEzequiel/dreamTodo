import { client } from '../../../database/client'
import { RequestCreateColletion } from '../../../test/repositories/InMemoryCollectionRepository'
import { CollectionRepository } from '../collectionRepositories'

export class PrismaCollectionRepository implements CollectionRepository {
  async createCollection({ name, userId, emoji }: RequestCreateColletion) {
    const colletion = await client.collection.create({
      data: {
        name,
        emoji,
        userId
      }
    })

    return colletion
  }

  async editColletion(id: string, name: string, emoji: string) {
    const editedCollection = await client.collection.update({
      where: {
        id
      },
      data: {
        name,
        emoji
      }
    })

    return editedCollection
  }

  async deleteColletion(id: string) {
    await client.collection.delete({
      where: {
        id
      }
    })
  }

  async listTodoOfColletion(name: string, complete: string) {
    const completeTodo = complete.includes('true') ? true : false

    const collection = await client.collection.findMany({
      where: {
        name
      },
      select: {
        id: true,
        name: true,
        emoji: true,
        userId: true,
        created_at: true,
        modified_at: true,
        Todo: {
          where: {
            complete: completeTodo
          }
        }
      }
    })

    return collection
  }

  async findCollectionByName(name: string) {
    const verifyIfCollectionExist = await client.collection.findFirst({
      where: {
        name
      }
    })

    return verifyIfCollectionExist
  }
  async findCollectionById(id: string) {
    const verifyIfColletionExist = await client.collection.findFirst({
      where: {
        id
      }
    })

    return verifyIfColletionExist
  }
}
