import { Collection } from "@prisma/client"




export interface CollectionRepository {

  createCollection: (userId: string, name: string, emoji: string) => Promise<Collection>

  deleteColletion: (id: string) => Promise<void>

  editColletion: (id: string, name: string, emoji: string) => Promise<Collection>

  findCollectionByName: (name: string) => Promise<Collection | null>

  findCollectionById: (id: string) => Promise<Collection | null>

}