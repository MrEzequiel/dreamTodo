import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../infra/errors/AppError";

type PayLoad = {
  sub: string
}


export default async function newPasswordUser(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization

  if(!authHeader){
    throw new AppError("Token não valido ou faltando.", 401)
  }

  const [, token] = authHeader.split(" ")

  try {
    const { sub } = verify(
      token,
      process.env.NEW_PASS_SECRET
    ) as PayLoad

    request.user = {
      sub
    }

    next()
  } catch {
    throw new AppError("Token invalido", 401)
  }
}
