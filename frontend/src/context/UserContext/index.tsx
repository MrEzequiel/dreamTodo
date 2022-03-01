import { createContext, FC, useCallback, useContext, useState } from 'react'
import Cookies from 'js-cookie'

interface IUser {
  user: {
    at_hash: string
    aud: string
    azp: string
    email: string
    email_verified: boolean
    exp: number
    family_name: string
    given_name: string
    iat: number
    iss: string
    jti: string
    locale: string
    name: string
    picture: string
    sub: string
    created_at: string
    id: string
    imageURL: string
    password: string
  }

  token: string
}

interface UserContext {
  user: IUser
  signIn: Function
  signOut: Function
}

const removeAuthCookies = () => {
  Cookies.remove('auth')
}

export const UserContext = createContext({} as UserContext)

const UserProvider: FC = ({ children }) => {
  const [data, setData] = useState<IUser>({} as IUser)

  const signOut = useCallback(() => {
    removeAuthCookies()
    setData({} as IUser)
  }, [])

  const signIn = useCallback(user => {
    Cookies.set('auth', JSON.stringify(user.token))

    setData(user)
  }, [])

  return (
    <UserContext.Provider value={{ user: data, signIn, signOut }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)

  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

export default UserProvider
