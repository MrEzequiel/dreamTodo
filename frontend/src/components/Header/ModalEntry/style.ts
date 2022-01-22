import styled from 'styled-components'

export const Container = styled.div`
  .sign-google {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    text-transform: none;
  }

  .actions {
    margin-top: 10px;
    font-size: 1.4rem;
    font-weight: 300;
    color: ${props => props.theme.colors.g7};

    p + p {
      margin-top: 2px;
    }

    strong {
      color: ${props => props.theme.colors.colorPrimary};
      font-weight: 400;
    }

    a:hover {
      color: ${props => props.theme.colors.g5};
      text-decoration: underline;
    }
  }

  label {
    position: relative;

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

export const FormStyle = styled.form`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  > button {
    margin-top: 10px;
  }
`

export const InputStyle = styled.input`
  width: 100%;
  height: 45px;
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
