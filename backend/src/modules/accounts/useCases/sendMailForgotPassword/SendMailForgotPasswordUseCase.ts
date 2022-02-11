
import nodemailer from 'nodemailer'


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


    const mail = await transporter.sendMail({
      from: 'Equipe todo <dreamtodoapp@gmail.com>',
      to: email,
      subject: 'Hello aqui está seu email',
      text: 'Ola tudo bem?'
    })

    return mail;
  }
}