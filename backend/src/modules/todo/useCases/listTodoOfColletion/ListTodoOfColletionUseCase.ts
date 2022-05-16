import { Todo } from '@prisma/client'
import { client } from '../../../../database/client'
import { AppError } from '../../../../infra/errors/AppError'
import { CollectionRepository } from '../../../../repositories/CollectionRepositories/collectionRepositories'

export class ListTodoOfColletionUseCase {
  constructor(private collectionRepository: CollectionRepository) {}
  async execute(name: string, complete: string) {
    const verifyIfColletionExist =
      await this.collectionRepository.findCollectionByName(name)

    if (!verifyIfColletionExist) {
      throw new AppError('Colletion não encontrada.')
    }

    const collection = await this.collectionRepository.listTodoOfColletion(
      name,
      complete
    )

    return collection
  }
}
