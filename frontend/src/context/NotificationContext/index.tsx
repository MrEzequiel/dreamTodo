import { createContext, FC, useCallback, useContext, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
export type ITypeNotification = 'success' | 'error' | 'warning' | 'info'

export interface INotification {
  type: ITypeNotification
  message: string
  id: string
}

interface INotificationContext {
  delayNotification: number
  notification: INotification[]
  setNotification: React.Dispatch<React.SetStateAction<INotification[]>>
  createNotification: (type: ITypeNotification, message: string) => void
}

export const NotificationContext = createContext({} as INotificationContext)

interface INotificationProviderProps {
  delayNotification?: number
}

const NotificationContextProvider: FC<INotificationProviderProps> = ({
  delayNotification = 5000,
  children
}) => {
  const [notification, setNotification] = useState<INotification[]>([])

  const createNotification = useCallback(
    (type: ITypeNotification, message: string) => {
      const id = uuidv4()
      setNotification(prev => [
        ...prev,
        {
          type,
          message,
          id
        }
      ])
    },
    []
  )

  return (
    <NotificationContext.Provider
      value={{
        createNotification,
        delayNotification,
        notification,
        setNotification
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => {
  const context = useContext(NotificationContext)
  return context
}

export default NotificationContextProvider
