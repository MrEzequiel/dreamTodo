import { Collection } from '@prisma/client'
import { client } from '../../../../database/client'
import { AppError } from '../../../../infra/errors/AppError'
import { CollectionRepository } from '../../../../repositories/CollectionRepositories/collectionRepositories'

export class DeleteCollectionUseCase {
  constructor(private collectionRepository: CollectionRepository) {}
  async execute(id: string): Promise<void> {
    const verifyIfCollectionExist =
      await this.collectionRepository.findCollectionById(id)

    if (!verifyIfCollectionExist) {
      throw new AppError('Colletion não encontrada!')
    }

    await this.collectionRepository.deleteColletion(id)
  }
}
