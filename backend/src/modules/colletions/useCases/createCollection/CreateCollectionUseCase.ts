import { Collection } from '@prisma/client'
import { AppError } from '../../../../infra/errors/AppError'
import { CollectionRepository } from '../../../../repositories/CollectionRepositories/collectionRepositories'
import { RequestCreateColletion } from '../../../../test/repositories/InMemoryCollectionRepository'

export class CreateCollectionUseCase {
  constructor(private collectionRepository: CollectionRepository) {}

  async execute({
    userId,
    name,
    emoji
  }: RequestCreateColletion): Promise<Collection> {
    const verifyIfCollectionExist =
      await this.collectionRepository.findCollectionByName(name)

    if (verifyIfCollectionExist) {
      throw new AppError("Collection já existe")
    }

    const collection = await this.collectionRepository.createCollection({
      name,
      emoji,
      userId
    })

    return collection
  }
}
