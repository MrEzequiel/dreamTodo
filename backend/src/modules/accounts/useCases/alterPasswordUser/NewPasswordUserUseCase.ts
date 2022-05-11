import { hash } from 'bcryptjs'
import { client } from '../../../../database/client'
import { AppError } from '../../../../infra/errors/AppError'
import { UserRepository } from '../../../../repositories/UserRepositories/userRepositories'

export class NewPasswordUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(password: string, confirmPassword: string, id_user: string) {
    if (password != confirmPassword) {
      throw new AppError('Senhas fornecidas não conhecidem')
    }

    const user = await client.user.findFirst({
      where: {
        id: id_user
      }
    })

    if (!user) throw new AppError('Usuário não encontrado')

    await this.userRepository.editUserPassword(user.id, password)
  }
}
