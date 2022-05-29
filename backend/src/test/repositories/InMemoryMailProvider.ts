import {
  MailProvider,
  MailType
} from '../../providers/MailProvider/MailProvider'

export class InMemoryMailProvider implements MailProvider {
  emails: any[] = []

  async sendMail({ to, subject, content }: MailType) {
    this.emails.push({
      to,
      subject,
      content
    })
  }
}
