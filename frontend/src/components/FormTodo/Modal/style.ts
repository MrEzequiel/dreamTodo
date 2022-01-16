import styled from 'styled-components'

export const ModalWrapper = styled.div`
  height: 100vh;
  width: 100%;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
  background: rgba(0, 0, 0, 0.5);

  display: flex;
  align-items: center;
  justify-content: center;
`

export const ModalContent = styled.div`
  padding: 30px 20px;
  width: calc(50% - 10px);
  background: ${props => props.theme.colors.g3};
  border-radius: ${props => props.theme.borderRadius};
  box-shadow: 0 16px 16px 0 rgba(0, 0, 0, 0.1);

  @media (max-width: 900px) {
    width: 80%;
  }

  @keyframes show-growing {
    from {
      opacity: 0;
      transform: scale(0.4);
    }
    to {
      opacity: initial;
      transform: initial;
    }
  }

  animation: show-growing 500ms cubic-bezier(0.075, 0.82, 0.165, 1);

  h2 {
    display: flex;
    align-items: center;
    font-size: 2.2rem;

    &::before {
      content: '';
      width: 10px;
      height: 10px;
      border-radius: 50%;
      margin-right: 10px;
      background: ${props => props.theme.colors.colorPrimary};
    }
  }
`

export const FormAddTodo = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 15px;

  input {
    padding: 10px;
    border: 2px solid ${props => props.theme.colors.g2};
    border-radius: 10px;
    font-size: 1.6rem;

    transition: border-color 1s, box-shadow 1s;
    transition-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
    &:focus {
      border-color: #11eedd;
      box-shadow: 0 0 0 4px #29b0a6;
    }
  }

  .description {
    height: 100px;
  }

  .links {
    input {
      width: 100%;
      margin-bottom: 5px;
    }

    p {
      color: ${props => props.theme.colors.g7};
      font-size: 1.4rem;
    }
  }
`

export const ButtonsModal = styled.div`
  margin-top: 15px;
  display: flex;
  gap: 15px;

  button {
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
  }

  .add {
    background: ${props => props.theme.colors.colorPrimary};
    color: ${props => props.theme.colors.g1};
    font-weight: 500;
  }

  .cancel {
    border: 2px solid ${props => props.theme.colors.colorPrimary2};
    color: ${props => props.theme.colors.g7};
  }
`
