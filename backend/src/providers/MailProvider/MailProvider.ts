export type MailType = {
  to: string
  subject: string
  content: string
}

export interface MailProvider {
  sendMail: (data: MailType) => Promise<void>
}
