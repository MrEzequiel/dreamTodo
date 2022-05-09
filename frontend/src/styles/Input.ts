import styled, { css } from 'styled-components'

export interface InputProps {
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

export const FileInputStyle = styled.label`
  overflow: hidden;
  cursor: pointer;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin: 0 auto;
  border: 1px dashed ${props => props.theme.colors.colorPrimary};
  color: ${props => props.theme.colors.colorPrimary};
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  input {
    display: none;
  }
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

export const HelperTextStyle = styled.span<{ isError?: boolean }>`
  color: ${props =>
    props.isError ? props.theme.colors.colorError : props.theme.colors.g6};
  font-size: 1.2rem;
  padding-left: 10px;
  margin-top: 4px;

  @keyframes collapse-effect {
    from {
      max-height: 0;
    }
    to {
      max-height: 100px;
    }
  }

  animation: collapse-effect 0.5s ease;
`

export default InputStyle
