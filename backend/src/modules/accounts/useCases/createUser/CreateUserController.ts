import { Request, Response } from 'express'
import { CreateUserUseCase } from './CreateUserUseCase'
import crypto from 'crypto'
import { PrismaUserRepository } from '../../../../repositories/UserRepositories/prisma/PrismaUserRepository'

export class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {id, name, email, password } = request.body
    let imageProfile = request?.file?.filename

    if (!imageProfile) {
      imageProfile = `https://robohash.org/${crypto.randomUUID()}`
    }

    const userRepository = new PrismaUserRepository()
    const createUserUseCase = new CreateUserUseCase(userRepository)

    const user = await createUserUseCase.execute({
      id,
      name,
      email,
      password,
      imageProfile,
      imageURL: imageProfile.includes('robohash')
        ? imageProfile
        : `${process.env.APP_URL}/files/${imageProfile}`
    })

    return response.json(user)
  }
}
