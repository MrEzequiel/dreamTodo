import styled from 'styled-components'

const InputStyle = styled.input`
  padding: 5px 10px;
  border-radius: 5px;
  border: 2px solid ${props => props.theme.colors.g2};
  font-size: 1.4rem;

  transition: border-color 500ms, box-shadow 700ms;
  transition-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);

  &:focus {
    border-color: ${props => props.theme.colors.colorPrimary};
    box-shadow: 0 0 0 4px ${props => props.theme.colors.colorPrimary2};
  }

  &[type='password'] {
    letter-spacing: 0.05em;
  }
`

export default InputStyle
