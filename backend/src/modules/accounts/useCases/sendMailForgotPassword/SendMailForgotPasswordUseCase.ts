import { sign } from 'jsonwebtoken'
import { AppError } from '../../../../infra/errors/AppError'
import { MailProvider } from '../../../../providers/MailProvider/MailProvider'
import { UserRepository } from '../../../../repositories/UserRepositories/userRepositories'
import { createCode } from '../../../../utils/createCode'

export class SendMailForgotPasswordUseCase {
  constructor(
    private userRepository: UserRepository,
    private mailProvider: MailProvider
  ) {}

  async execute(email: string): Promise<Object> {
    const verifyUserExist = await this.userRepository.findUserByEmail(email)

    if (!verifyUserExist) {
      throw new AppError('Usuario não encontrado, tente novamente.')
    }

    const code = await createCode()

    const token = sign({ cod: code }, String(process.env.NEW_PASS_SECRET), {
      subject: verifyUserExist.id,
      expiresIn: '15m'
    })

    await this.mailProvider.sendMail({
      to: email,
      subject: 'Recuperação de senha',
      content: `<p>Boa tarde, para recuperar sua senha, use esse codigo: ${code}</p>`
    })

    return { token }
  }
}
