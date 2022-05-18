import { client } from '../../../database/client'
import { IEditCollection } from '../../../modules/colletions/useCases/editCollectionName/EditCollectionUseCase'
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

  async editColletion({ id, emoji, name }: IEditCollection) {
    await client.collection.update({
      where: {
        id
      },
      data: {
        name,
        emoji
      }
    })
  }

  async deleteColletion(id: string) {
    await client.collection.delete({
      where: {
        id
      }
    })
  }

  async listTodoOfColletion(name: string, complete?: string) {
    if (complete) {
      const completeTodo = complete.includes('true') ? true : false

      const collection = await client.collection.findFirst({
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
    } else {
      const collection = await client.collection.findFirst({
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
          Todo: true
        }
      })
      return collection
    }
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
