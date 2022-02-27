import styled, { css } from 'styled-components'

interface InputProps {
  isValid?: boolean
}

const InputCSS = css<InputProps>`
  display: block;
  width: 100%;
  padding: 8px;
  border-radius: 5px;
  border: 2px solid
    ${props =>
      props.isValid ? props.theme.colors.g2 : props.theme.colors.colorError};
  font-size: 1.4rem;

  transition: border-color 500ms, box-shadow 700ms;
  transition-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);

  &:focus {
    ${props =>
      props.isValid &&
      css`
        border-color: ${props => props.theme.colors.colorPrimary};
        box-shadow: 0 0 0 4px ${props => props.theme.colors.colorPrimary2};
      `}
  }
`

const InputStyle = styled.input<InputProps>`
  ${InputCSS}
`

export const TextAreaStyle = styled.textarea<InputProps>`
  ${InputCSS}
  resize: vertical;
`

InputStyle.defaultProps = {
  isValid: true
}

TextAreaStyle.defaultProps = {
  isValid: true
}

export default InputStyle
