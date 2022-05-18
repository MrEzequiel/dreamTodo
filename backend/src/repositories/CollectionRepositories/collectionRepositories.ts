import { Collection } from '@prisma/client'
import { IEditCollection } from '../../modules/colletions/useCases/editCollectionName/EditCollectionUseCase'
import { RequestCreateColletion } from '../../test/repositories/InMemoryCollectionRepository'

export interface CollectionRepository {
  createCollection: ({
    name,
    userId,
    emoji
  }: RequestCreateColletion) => Promise<Collection>

  deleteColletion: (id: string) => Promise<void>

  editColletion: ({ id, emoji, name }: IEditCollection) => Promise<void>

  listTodoOfColletion: (name: string, complete: string) => Promise<any>

  findCollectionByName: (name: string) => Promise<Collection | null>

  findCollectionById: (id: string) => Promise<Collection | null>
}
