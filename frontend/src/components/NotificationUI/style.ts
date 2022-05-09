import { type } from 'os'
import styled, { DefaultTheme } from 'styled-components'
import { ITypeNotification } from '../../context/NotificationContext'

const getColors = (type: ITypeNotification, theme: DefaultTheme) => {
  switch (type) {
    case 'error':
      return theme.colors.colorError
    case 'warning':
      return theme.colors.colorWarning
    case 'info':
      return theme.colors.colorInfo
    default:
      return theme.colors.colorPrimary
  }
}

export const NotificationContainer = styled.aside`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;

  position: fixed;
  top: 80px;
  right: 20px;
  z-index: 999;

  // enter animation
  .notification-enter {
    opacity: 0;
    transform: translateX(50px);
  }
  .notification-enter-active {
    opacity: initial;
    transform: translateX(0);
    transition: opacity 400ms, transform 400ms;
    transition-timing-function: ease-in-out;
  }

  // exit animation
  .notification-exit {
    opacity: 1;
  }
  .notification-exit-active {
    opacity: 0;
    transform: translateX(50px);
    max-height: 0;
    transition: opacity 400ms, transform 400ms, max-height 400ms;
    transition-timing-function: ease-in-out;
  }
`

interface NotificationProps {
  type: ITypeNotification
  timeout: number
}

export const NotificationContent = styled.div<NotificationProps>`
  flex-shrink: 0;
  position: relative;

  display: flex;
  border-radius: 5px;
  width: 300px;
  max-height: 500px;

  box-shadow: 0 4px 4px -2px rgba(0, 0, 0, 0.25);
  overflow: hidden;

  background: ${props => props.theme.colors.g2};

  border: 2px solid ${props => getColors(props.type, props.theme)};
  color: ${props => getColors(props.type, props.theme)};

  @keyframes show-left-notification {
    from {
      transform: translateX(30px);
      opacity: 0;
    }
    to {
      transform: initial;
      opacity: 1;
    }
  }

  animation: show-left-notification 400ms ease;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: calc(100% + 2px);
    height: 2px;

    @keyframes widht-animation {
      to {
        width: 100%;
      }
      from {
        width: 0;
      }
    }

    animation: ${props => props.timeout}ms widht-animation linear;
    background: ${props => getColors(props.type, props.theme)};
  }
`

export const NotificationIcon = styled.div`
  flex-shrink: 0;
  width: 50px;
  height: 100%;
  border-radius: 5px 0 0 5px;

  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colors.g1};

  svg {
    color: inherit;
  }
`

export const NotificationText = styled.div`
  margin-left: 10px;
  padding: 10px 5px;
  flex-grow: 1;

  h3 {
    font-size: 1.6rem;
    line-height: 1;
    font-weight: 600;
    color: ${props => props.theme.colors.g5};
  }

  p {
    font-size: 1.4rem;
    font-weight: 400;
    margin-top: 4px;
    word-break: break-word;
    color: ${props => props.theme.colors.g7};
  }
`

export const NotificationClose = styled.div`
  flex-shrink: 0;
  height: 100%;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    cursor: pointer;
    width: 20px;
    height: 20px;
    background: transparent;
    color: ${props => props.theme.colors.g5};
    border: none;
    padding: 0;
  }
`
