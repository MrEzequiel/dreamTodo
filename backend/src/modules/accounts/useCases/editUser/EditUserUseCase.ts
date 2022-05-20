import { AppError } from '../../../../infra/errors/AppError'
import { UserRepository } from '../../../../repositories/UserRepositories/userRepositories'

export type IRequestEdit = {
  id: string
  name?: string
  imageURL?: string
  imageProfile?: string
}

export class EditUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ id, name, imageURL, imageProfile }: IRequestEdit) {
    const user = await this.userRepository.findUserById(id)

    if (!user) {
      throw new AppError('Usuário não encontrado')
    }

    const userEdited = await this.userRepository.editUser({
      id,
      name,
      imageProfile,
      imageURL
    })

    return userEdited
  }
}
