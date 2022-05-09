import styled, { css, DefaultTheme } from 'styled-components'
import { FilledButton, OutlinedButton } from './LayoutComponents'

interface IButtonProps {
  outlined: boolean
  isLoading: boolean
  wave?: boolean
  color?: 'error' | 'primary' | 'secondary'
}

const getColor = (color: IButtonProps['color'], theme: DefaultTheme) => {
  switch (color) {
    case 'error':
      return theme.colors.colorError
    case 'primary':
      return theme.colors.colorPrimary
    case 'secondary':
      return theme.colors.colorPrimary2
    default:
      return theme.colors.colorPrimary
  }
}

const ButtonStyle = styled.button<IButtonProps>`
  position: relative;

  text-transform: capitalize;
  cursor: pointer;
  border-radius: ${props => props.theme.borderRadius};
  box-shadow: 0 4px 4px -1px rgba(0, 0, 0, 0.1);
  display: block;
  padding: 8px 16px;
  height: 40px;
  font-size: 1.6rem;

  ${props =>
    props.isLoading &&
    css`
      cursor: progress;
      filter: opacity(0.6) !important;

      &:hover {
        transform: none !important;
      }
    `}

  transition: all 700ms cubic-bezier(0.075, 0.82, 0.165, 1);

  &:hover {
    filter: brightness(1.2);
    transform: scale(1.05);
  }

  ${props => (props.outlined ? OutlinedButton() : FilledButton())}

  .wave {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    border-radius: ${props => props.theme.borderRadius};

    @keyframes pulse {
      0% {
        box-shadow: 0 0 0 0 ${props => getColor(props.color, props.theme)};
      }
    }

    ${({ wave }) =>
      wave &&
      css`
        animation: pulse 1.2s cubic-bezier(0.075, 0.82, 0.165, 1);
        box-shadow: 0 0 0 1.3em rgba(255, 255, 255, 0);
      `}
  }

  .svg-container {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 999;

    display: flex;
    justify-content: center;
    align-items: center;

    transition: all 500ms cubic-bezier(0.075, 0.82, 0.165, 1);

    &.fade-enter {
      opacity: 0;
      transform: scale(0);
    }
    &.fade-enter-active {
      opacity: 1;
      transform: scale(1);
    }
    &.fade-exit {
      opacity: 1;
      transform: scale(0);
    }
    &.fade-exit-active {
      opacity: 0;
      transform: scale(1);
    }
  }

  .loading-indicator {
    @keyframes rotate-loader {
      from {
        transform: rotate(0);
      }
      to {
        transform: rotate(360deg);
      }
    }

    animation: rotate-loader 900ms cubic-bezier(1, 0.39, 0.17, 1) infinite;
  }

  ${props => props.outlined && `color: ${getColor(props.color, props.theme)}`};
  ${props =>
    !props.outlined && `background: ${getColor(props.color, props.theme)}`};
  border-color: ${props => getColor(props.color, props.theme)};
`
ButtonStyle.defaultProps = {
  color: 'primary'
}

export default ButtonStyle
