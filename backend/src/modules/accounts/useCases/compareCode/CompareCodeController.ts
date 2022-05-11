import { Request, Response } from "express";
import { CompareCodeUseCase } from "./CompareCodeUseCase";



export class CompareCodeController {

  async handle(request: Request, response: Response): Promise<Response>{

    const { code } = request.body;
    const { authorization } = request.headers;

    const compareCodeUseCase = new CompareCodeUseCase();

    await compareCodeUseCase.execute(code, String(authorization));

    return response.json({
      message: 'Codigo correto'
    })
  }
}