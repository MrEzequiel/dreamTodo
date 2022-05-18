import { AppError } from '../../../../infra/errors/AppError'
import { CollectionRepository } from '../../../../repositories/CollectionRepositories/collectionRepositories'

export interface IEditCollection {
  id: string
  name?: string
  emoji?: string
}

export class EditCollectionUseCase {
  constructor(private collectionRepository: CollectionRepository) {}
  async execute({ id, name, emoji }: IEditCollection): Promise<void> {
    const verifyIfCollectionExist =
      await this.collectionRepository.findCollectionById(id)

    if (!verifyIfCollectionExist) {
      throw new AppError('Colletion não encontrada!')
    }

    await this.collectionRepository.editColletion({
      id,
      emoji,
      name
    })
  }
}
