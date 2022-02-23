
import { sign } from 'jsonwebtoken';
import nodemailer from 'nodemailer'
import { client } from '../../../../database/client';
import { AppError } from '../../../../infra/errors/AppError';
import { createCode } from '../../../../utils/createCode';

export class SendMailForgotPasswordUseCase {


  async execute(email: string) {

    const verifyUserExist = await client.user.findFirst({
      where: {
        email
      } 
    })

    if(!verifyUserExist) {
      throw new AppError('Usuario não encontrado, tente novamente.')
    }

    const user = process.env.EMAIL_SECRET_GMAIL
    const pass = process.env.EMAIL_SECRET_PASSWD

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 465,
      host: 'smtp.gmail.com',
      secure: true,
      auth : {
        user,
        pass
      }
    }) 

    const code = await createCode();

    const token = sign({ cod: code }, process.env.NEW_PASS_SECRET, {
      subject: verifyUserExist.id,
      expiresIn: '15m'
    })

    await transporter.sendMail({
      from: 'Equipe todo <dreamtodoapp@gmail.com>',
      to: email,
      subject: 'Recuperação de senha do DreamApp',
      text: `Boa tarde, para recuperar sua senha, use esse codigo: ${code}`
    })

    return { token }
  }
}