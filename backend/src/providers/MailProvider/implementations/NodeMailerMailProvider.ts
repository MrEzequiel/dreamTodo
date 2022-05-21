import { MailProvider, MailType } from '../MailProvider'
import nodemailer, { Transporter } from 'nodemailer'

export class NodeMailerMailProvider implements MailProvider {
  private client: Transporter

  constructor() {
    const user = process.env.EMAIL_SECRET_GMAIL
    const pass = process.env.EMAIL_SECRET_PASSWD

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 465,
      host: 'smtp.gmail.com',
      secure: true,
      auth: {
        user,
        pass
      }
    })

    this.client = transporter
  }

  async sendMail({ to, subject, content }: MailType) {
    this.client.sendMail({
      from: 'DreamTodo <noreplay@dreamtodo.com.br>',
      to,
      subject,
      html: content
    })
  }
}
