import { Request, Response } from 'express'
import { NodeMailerMailProvider } from '../../../../providers/MailProvider/implementations/NodeMailerMailProvider'
import { PrismaUserRepository } from '../../../../repositories/UserRepositories/prisma/PrismaUserRepository'
import { SendMailForgotPasswordUseCase } from './SendMailForgotPasswordUseCase'

export class SendMailForgotPasswordController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.body

    const userRepository = new PrismaUserRepository()
    const mailProvider = new NodeMailerMailProvider()
    const sendMailForgotPasswordUseCase = new SendMailForgotPasswordUseCase(
      userRepository,
      mailProvider
    )

    const token = await sendMailForgotPasswordUseCase.execute(email)

    return response.json(token)
  }
}
