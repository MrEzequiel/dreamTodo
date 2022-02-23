import { compare, hash } from "bcryptjs";
import { verify } from "jsonwebtoken";
import { AppError } from "../infra/errors/AppError";

type PayLoad = {
  cod: string
}

export async function CompareCode(code: string, token: string) {

  const data = verify(token, process.env.NEW_PASS_SECRET);

  const { cod } = data as PayLoad;

  const hashCode = await hash(cod, 8)

  const isValidCode = await compare(code, hashCode);

  if(!isValidCode) {
    throw new AppError('Incorret Code!');
  }

  return isValidCode;
}