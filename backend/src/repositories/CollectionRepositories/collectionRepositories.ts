import { Collection } from '@prisma/client'
import { RequestCreateColletion } from '../../test/repositories/InMemoryCollectionRepository'

export interface CollectionRepository {
  createCollection: ({
    name,
    userId,
    emoji
  }: RequestCreateColletion) => Promise<Collection>

  deleteColletion: (id: string) => Promise<void>

  editColletion: (
    id: string,
    name: string,
    emoji: string
  ) => Promise<Collection>

  listTodoOfColletion: (name: string, complete: string) => Promise<any>

  findCollectionByName: (name: string) => Promise<Collection | null>

  findCollectionById: (id: string) => Promise<Collection | null>
}
