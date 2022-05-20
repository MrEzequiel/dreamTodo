import { Request, Response } from 'express'
import { PrismaUserRepository } from '../../../../repositories/UserRepositories/prisma/PrismaUserRepository'
import { EditUserUseCase } from './EditUserUseCase'

export class EditUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user

    const { name } = request.body
    const imageProfile = request?.file?.filename

    const prismaUserRepository = new PrismaUserRepository()
    const editUserUseCase = new EditUserUseCase(prismaUserRepository)

    const user = await editUserUseCase.execute({
      id,
      name,
      imageURL: `${process.env.APP_URL}/files/${imageProfile}`,
      imageProfile
    })

    return response.json(user)
  }
}
