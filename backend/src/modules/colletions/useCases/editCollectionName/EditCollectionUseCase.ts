import { Collection } from '@prisma/client'
import { AppError } from '../../../../infra/errors/AppError'
import { CollectionRepository } from '../../../../repositories/CollectionRepositories/collectionRepositories'

export interface IEditCollection {
  id: string
  name?: string
  emoji?: string
}

export class EditCollectionUseCase {
  constructor(private collectionRepository: CollectionRepository) {}
  async execute({ id, name, emoji }: IEditCollection): Promise<Collection> {
    const verifyIfCollectionExist =
      await this.collectionRepository.findCollectionById(id)

    if (!verifyIfCollectionExist) {
      throw new AppError('Colletion não encontrada!')
    }

    const collection = await this.collectionRepository.editColletion({
      id,
      emoji,
      name
    })

    return collection
  }
}
