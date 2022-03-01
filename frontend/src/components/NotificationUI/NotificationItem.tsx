import React, { useEffect, useRef, useState } from 'react'
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaExclamationTriangle,
  FaTimes,
  FaTimesCircle
} from 'react-icons/fa'
import { CSSTransition } from 'react-transition-group'
import {
  INotification,
  useNotification
} from '../../context/NotificationContext'
import {
  NotificationClose,
  NotificationContent,
  NotificationIcon,
  NotificationText
} from './style'

const typesNotifications = {
  success: { text: 'Sucess', icon: <FaCheckCircle /> },
  error: { text: 'Error', icon: <FaTimesCircle /> },
  warning: { text: 'Warning', icon: <FaExclamationTriangle /> },
  info: { text: 'Information', icon: <FaExclamationCircle /> }
}

interface INotificationUIProps {
  notification: INotification
}

const NotificationItem: React.FC<INotificationUIProps> = ({ notification }) => {
  const notificationRef = useRef<HTMLDivElement | null>(null)
  const timerRef = useRef<NodeJS.Timeout>()
  const { setNotification, delayNotification } = useNotification()
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (!notification) return
    setIsVisible(true)

    timerRef.current = setTimeout(() => {
      setIsVisible(false)
    }, delayNotification)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [notification, delayNotification])

  return (
    <CSSTransition
      in={isVisible}
      timeout={400}
      classNames="notification"
      nodeRef={notificationRef}
      onExited={() =>
        setNotification(prevNotifications =>
          prevNotifications.filter(n => n.id !== notification.id)
        )
      }
      unmountOnExit
    >
      <NotificationContent
        type={notification.type}
        timeout={delayNotification}
        ref={notificationRef}
      >
        <NotificationIcon>
          {typesNotifications[notification!.type].icon}
        </NotificationIcon>

        <NotificationText>
          <h3>{typesNotifications[notification!.type].text}</h3>
          <p>{notification?.message}</p>
        </NotificationText>

        <NotificationClose>
          <button
            onClick={() => {
              setIsVisible(false)
              if (timerRef.current) clearTimeout(timerRef.current)
            }}
          >
            <FaTimes />
          </button>
        </NotificationClose>
      </NotificationContent>
    </CSSTransition>
  )
}

export default NotificationItem
