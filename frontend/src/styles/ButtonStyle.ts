import styled from 'styled-components'
import { FilledButton, OutlinedButton } from './LayoutComponents'

interface IButtonProps {
  outlined: boolean
}

const ButtonStyle = styled.button<IButtonProps>`
  text-transform: capitalize;
  cursor: pointer;
  border-radius: ${props => props.theme.borderRadius};
  box-shadow: 0 4px 4px -1px rgba(0, 0, 0, 0.1);
  display: block;
  padding: 8px 16px;
  height: 40px;
  font-size: 1.6rem;

  transition: all 700ms cubic-bezier(0.075, 0.82, 0.165, 1);

  &:hover {
    filter: brightness(1.2);
    transform: scale(1.05);
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 ${props => props.theme.colors.colorPrimary};
    }
  }

  &:active {
    transform: scale(0.95);
    animation: pulse 1.2s cubic-bezier(0.075, 0.82, 0.165, 1);
    box-shadow: 0 0 0 1.2em rgba(255, 255, 255, 0);
  }

  ${props => (props.outlined ? OutlinedButton() : FilledButton())}
`

export default ButtonStyle
