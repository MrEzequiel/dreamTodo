import { Request, Response } from "express";
import { SendMailForgotPasswordUseCase } from "./SendMailForgotPasswordUseCase";



export class SendMailForgotPasswordController {


  async handle(request: Request, response: Response) {

    const { email } = request.body;

    const sendMailForgotPasswordUseCase = new SendMailForgotPasswordUseCase();

    await sendMailForgotPasswordUseCase.execute(email)

    return response.json({
      message: 'Email enviado! Verifique sua caixa de entrada.'
    })
  }
}