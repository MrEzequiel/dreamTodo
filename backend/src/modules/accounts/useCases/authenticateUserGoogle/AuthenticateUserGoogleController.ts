import { Request, Response } from "express";
import { AuthenticateUserGoogleUseCase } from "./AuthenticateUserGoogleUseCase";



export class AuthenticateUserGoogleController {

  async handle(request: Request, response: Response): Promise<Response>{
    
    const { CLIENT_ID, token } = request.params

    const authenticateUserGoogleUseCase = new AuthenticateUserGoogleUseCase();

    const user = await authenticateUserGoogleUseCase.execute(CLIENT_ID, token);

    return response.json(user);
  }
}