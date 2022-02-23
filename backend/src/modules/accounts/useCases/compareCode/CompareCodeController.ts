import { Request, Response } from "express";
import { CompareCodeUseCase } from "./CompareCodeUseCase";



export class CompareCodeController {

  async handle(request: Request, response: Response){

    const { code } = request.body;
    const { authorization } = request.headers;

    const compareCodeUseCase = new CompareCodeUseCase();

    await compareCodeUseCase.execute(code, authorization);

    return response.json({
      message: 'Codigo correto'
    })
  }
}