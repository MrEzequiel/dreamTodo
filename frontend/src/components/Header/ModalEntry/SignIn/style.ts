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

      background: ${props => props.theme.colors.g2};
      width: 25px;
      height: 25px;
    }
  }
`

export const Separator = styled.p`
  color: ${props => props.theme.colors.g1};
  font-weight: 300;
  font-size: 1.6rem;
  line-height: 1;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  margin: 20px 0;

  &::before,
  &::after {
    content: '';
    width: 100%;
    height: 1px;
    border-radius: 1px;
    background: linear-gradient(
      to left,
      ${props => props.theme.colors.g1},
      ${props => props.theme.colors.g3}
    );
  }

  &::after {
    background: linear-gradient(
      to right,
      ${props => props.theme.colors.g1},
      ${props => props.theme.colors.g3}
    );
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

  a:hover {
    color: ${props => props.theme.colors.g5};
    text-decoration: underline;
  }
`

export const LoadingLoginWithGoogle = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 20;
  background: rgba(0, 0, 0, 0.7);

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  & > div {
    @keyframes growing {
      from {
        transform: scale(0.5);
      }
      to {
        transform: scale(1);
      }
    }

    animation: growing 700ms ease;
  }

  svg {
    color: ${props => props.theme.colors.colorPrimary};
  }

  h3 {
    font-size: 2.4rem;
    font-weight: 600;
    margin-top: 4px;
  }
`
