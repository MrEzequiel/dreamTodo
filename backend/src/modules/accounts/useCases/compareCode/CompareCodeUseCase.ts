import { AppError } from "../../../../infra/errors/AppError";
import { CompareCode } from "../../../../utils/compareCode";



export class CompareCodeUseCase {

  async execute(code: string, authorization: string){

    if(!code) throw new AppError('Codigo faltando', 404);
    else if(!authorization) throw new AppError('Token faltando', 404);

    const [, token] = authorization.split(" ");

    const isValidCode = await CompareCode(code, token);

    if(!isValidCode) throw new AppError('Codigo incorreto')
  }
}