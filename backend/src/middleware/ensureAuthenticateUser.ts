import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../infra/errors/AppError";

interface IpayLoad{
  sub: string
}


export default function ensureAuthenticareUser(request: Request, response: Response, next: NextFunction){

  const authHeader = request.headers.authorization

  if(!authHeader){
    throw new AppError("Token não valido ou faltando.", 401)
  }

  const [, token] = authHeader.split(" ")

  try {
    const { sub: user_id } = verify(
      token,
      String(process.env.SECRET_KEY_TOKEN)
    ) as IpayLoad

    request.user = {
      id: user_id,
    }

    next()
  } catch {
    throw new AppError("Token invalido", 401)
  }
}