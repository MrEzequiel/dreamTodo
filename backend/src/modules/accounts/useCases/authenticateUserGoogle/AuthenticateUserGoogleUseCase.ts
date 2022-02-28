
import { OAuth2Client } from 'google-auth-library'

export class AuthenticateUserGoogleUseCase {

  async execute(CLIENT_ID: string, token: string){

    const client = new OAuth2Client()

    
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID 
    });

    

    const payload = ticket.getPayload();

    return { payload }
  }
}