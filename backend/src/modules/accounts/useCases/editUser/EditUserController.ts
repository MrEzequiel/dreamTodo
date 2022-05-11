import { Request, Response } from 'express'
import { PrismaUserRepository } from '../../../../repositories/UserRepositories/prisma/PrismaUserRepository'
import { UserRepository } from '../../../../repositories/UserRepositories/userRepositories'
import { EditUserUseCase } from './EditUserUseCase'

export class EditUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user

    const { name } = request.body
    const  imageProfile = request?.file?.filename

    const userRepository = new PrismaUserRepository()
    const editUserUseCase = new EditUserUseCase(userRepository)

    const edit = await editUserUseCase.execute({
      id,
      name,
      imageURL: `${process.env.APP_URL}/files/${imageProfile}`,
      imageProfile,
    })

    return response.json(edit)
  }
}
