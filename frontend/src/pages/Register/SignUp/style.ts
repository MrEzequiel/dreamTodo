import styled from 'styled-components'

export const SignUp = styled.div`
  .sign-google {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    text-transform: none;
  }

  .grid-inputs {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    column-gap: 10px;
  }
`

export const MessageError = styled.div`
  color: ${props => props.theme.colors.colorError};
  font-size: 1.2rem;
  margin-top: 4px;
  font-weight: 300;
`
