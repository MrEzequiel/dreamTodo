import { Collection } from '@prisma/client'
import { CollectionRepository } from '../../repositories/CollectionRepositories/collectionRepositories'
import { v4 } from 'uuid'

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
    this.colletions.filter(colletion => colletion.id === id)
  }

  editColletion: (
    id: string,
    name: string,
    emoji: string
  ) => Promise<Collection>

  async findCollectionByName(name: string) {
    const colletion = this.colletions.find(colletion => colletion.name === name)
    return colletion ?? null
  }
  async findCollectionById(id: string) {
    const colletion = this.colletions.find(colletion => colletion.id === id)
    return colletion ?? null
  }
}
