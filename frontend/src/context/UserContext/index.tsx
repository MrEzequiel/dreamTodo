import {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from 'react-query'
import { getRefreshToken } from '../../functions/User/getRefreshToken'
import SuspenseFallback from '../../components/SuspenseFallback'

export interface IUser {
  refresh: {
    createdAt: string
    expires_in: string
    id: string
    refreshToken: string
    userId: string
  }

  token: string

  user: {
    created_at: string
    email: string
    id: string
    imageProfile?: string
    imageURL?: string
    name?: string
    password: string
  }
}

interface UserContext {
  user: IUser
  isUser: boolean
  signIn: Function
  signOut: Function
}

const removeAuthCookies = () => {
  Cookies.remove('auth')
  Cookies.remove('refresh')
}

export const UserContext = createContext({} as UserContext)

const UserProvider: FC = ({ children }) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const [data, setData] = useState<IUser>({} as IUser)
  const [isUser, setIsUser] = useState(false)

  const refreshCookie = Cookies.get('refresh')

  const {
    mutate: mutateRefreshToken,
    isLoading,
    isError,
    isSuccess
  } = useMutation(getRefreshToken, {
    onSuccess: (data: IUser) => {
      setData(data)
    }
  })

  const signOut = useCallback(() => {
    removeAuthCookies()
    queryClient.removeQueries()
    setData({} as IUser)

    navigate('register')
  }, [navigate, queryClient])

  const signIn = useCallback((user: IUser) => {
    Cookies.set('auth', JSON.stringify(user.token))
    Cookies.set('refresh', JSON.stringify(user.refresh.refreshToken))

    setData(user)
  }, [])

  useEffect(() => {
    setIsUser(!!data.token)
  }, [data])

  useEffect(() => {
    const refreshCookie = Cookies.get('refresh')

    if (refreshCookie && Object.keys(data).length === 0) {
      mutateRefreshToken(JSON.parse(refreshCookie))
    }
  }, [])

  return (
    <UserContext.Provider value={{ user: data, signIn, signOut, isUser }}>
      {refreshCookie &&
      Object.keys(data).length === 0 &&
      !isError &&
      !isSuccess ? (
        <SuspenseFallback />
      ) : (
        children
      )}
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
