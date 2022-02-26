import { User } from "@prisma/client";
import { client } from "../../../../database/client";


interface IRequestEdit {
  id: string
  name: string
  imageURL: string
}

export class EditUserUseCase {

  async execute({ id, name, imageURL }: IRequestEdit){

    const user = await client.user.findFirst({
      where: {
        id
      }
    })

    const editedUser = await client.user.update({
      where: {
        id: user.id
      },
      data: {
        name,
        imageURL
      },
      select: {
        id: true,
        name: true,
        email: true,
        imageURL: true,
        created_at: true,
      }
    })

    return editedUser;
  }
}