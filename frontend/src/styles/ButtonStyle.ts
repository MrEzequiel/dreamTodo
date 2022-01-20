import styled from 'styled-components'
import { FilledButton, OutlinedButton } from './LayoutComponents'

interface IButtonProps {
  outlined: boolean
}

const ButtonStyle = styled.button<IButtonProps>`
  text-transform: capitalize;
  cursor: pointer;
  border-radius: ${props => props.theme.borderRadius};
  width: 100px;
  height: 40px;
  font-size: 1.6rem;

  transition: all 700ms cubic-bezier(0.075, 0.82, 0.165, 1);

  &:hover {
    filter: brightness(1.2);
    transform: scale(1.05);
  }

  ${props => (props.outlined ? OutlinedButton() : FilledButton())}
`

export default ButtonStyle
