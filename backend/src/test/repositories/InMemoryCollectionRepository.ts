import { Collection } from '@prisma/client'
import { CollectionRepository } from '../../repositories/CollectionRepositories/collectionRepositories'

export type RequestCreateColletion = {
  userId: string
  name: string
  emoji: string
}

export class InMemoryCollectionRepository implements CollectionRepository {
  colletions: Collection[] = []

  async createCollection(data: RequestCreateColletion) {
    Object.assign(data)
    
    this.colletions.push(data as Collection)
    return data as Collection
  }
  deleteColletion: (id: string) => Promise<void>
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
