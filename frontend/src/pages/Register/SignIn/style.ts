import styled from 'styled-components'

export const SignIn = styled.div`
  .sign-google {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    text-transform: none;
  }
`

export const FormStyle = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;

  > button {
    margin-top: 10px;
  }

  input {
    width: 100%;
    height: 45px;
  }

  label {
    position: relative;

    > input[type='password'] {
      padding-right: 40px;
    }

    // button show password
    > button {
      cursor: pointer;
      position: absolute;
      right: 10px;
      top: 10px;

      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 5px;

      background: ${props => props.theme.colors.g3};
      width: 25px;
      height: 25px;
    }
  }
`

export const Separator = styled.p`
  color: ${props => props.theme.colors.g3};
  font-weight: 300;
  font-size: 1.6rem;
  line-height: 1;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  margin-top: 30px;
  margin-bottom: 20px;

  &::before,
  &::after {
    content: '';
    width: 100%;
    height: 1px;
    border-radius: 1px;
    background: ${props => props.theme.colors.g3};
  }

  &::after {
    background: ${props => props.theme.colors.g3};
  }
`

export const Actions = styled.div`
  margin-top: 15px;
  font-size: 1.4rem;
  font-weight: 300;
  color: ${props => props.theme.colors.g7};

  p + p {
    margin-top: 3px;
  }

  strong {
    color: ${props => props.theme.colors.colorPrimary};
    font-weight: 400;
  }

  a {
    cursor: pointer;
  }

  a:hover {
    color: ${props => props.theme.colors.g5};
    text-decoration: underline;
  }
`

export const MessageError = styled.div`
  color: ${props => props.theme.colors.colorError};
  font-size: 1.2rem;
  margin-top: 4px;
  font-weight: 300;
`
