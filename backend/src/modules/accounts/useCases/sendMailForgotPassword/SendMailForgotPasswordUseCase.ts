
import nodemailer from 'nodemailer'
import { createCode } from '../../../../utils/createCode';

export class SendMailForgotPasswordUseCase {


  async execute(email: string) {

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

    await transporter.sendMail({
      from: 'Equipe todo <dreamtodoapp@gmail.com>',
      to: email,
      subject: 'Recuperação de senha do DreamApp',
      text: `Boa tarde, para recuperar sua senha, use esse codigo: ${code}`
    })
  }
}