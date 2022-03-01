import React from 'react'
import { useNotification } from '../../context/NotificationContext'
import NotificationItem from './NotificationItem'
import { NotificationContainer } from './style'

const NotificationUI: React.FC = () => {
  const { notification } = useNotification()

  return (
    <NotificationContainer>
      {notification.map(item => (
        <NotificationItem key={item.id} notification={item} />
      ))}
    </NotificationContainer>
  )
}

export default NotificationUI
