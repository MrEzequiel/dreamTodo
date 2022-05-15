import { Collection } from '@prisma/client'
import { client } from '../../../../database/client'
import { AppError } from '../../../../infra/errors/AppError'
import { CollectionRepository } from '../../../../repositories/CollectionRepositories/collectionRepositories'

interface IRequest {
  id: string
  name: string
  emoji: string
}

export class EditCollectionUseCase {
  constructor(private collectionRepository: CollectionRepository) {}
  async execute({ id, name, emoji }: IRequest): Promise<Collection> {
    const verifyIfCollectionExist =
      await this.collectionRepository.findCollectionById(id)

    if (!verifyIfCollectionExist) {
      throw new AppError('Colletion não encontrada!')
    }

    const editedCollection = await this.collectionRepository.editColletion(
      id,
      name,
      emoji
    )

    return editedCollection
  }
}
