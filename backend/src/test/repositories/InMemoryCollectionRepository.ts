import { Collection } from '@prisma/client'
import { CollectionRepository } from '../../repositories/CollectionRepositories/collectionRepositories'
import { v4 } from 'uuid'
import { IEditCollection } from '../../modules/colletions/useCases/editCollectionName/EditCollectionUseCase'
import { AppError } from '../../infra/errors/AppError'

export type RequestCreateColletion = {
  userId: string
  name: string
  emoji: string
}

export class InMemoryCollectionRepository implements CollectionRepository {
  listTodoOfColletion: (name: string, complete: string) => Promise<any>
  colletions: Collection[] = []

  async createCollection(data: RequestCreateColletion) {
    Object.assign(data, {
      id: v4()
    })

    this.colletions.push(data as Collection)

    return data as Collection
  }

  async deleteColletion(id: string) {
    this.colletions.filter(colletion => colletion.id !== id)
  }

  async editColletion({ id, emoji, name }: IEditCollection) {
    const collection = await this.findCollectionById(id)

    if (!collection) {
      throw new AppError('Error')
    }

    collection.emoji = emoji ?? collection.emoji
    collection.name = name ?? collection.name

    return collection
  }

  async findCollectionByName(name: string) {
    const colletion = this.colletions.find(colletion => colletion.name === name)
    return colletion ?? null
  }
  async findCollectionById(id: string) {
    const colletion = this.colletions.find(colletion => colletion.id === id)
    return colletion ?? null
  }
}
