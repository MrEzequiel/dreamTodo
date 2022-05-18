import styled from 'styled-components'

export const FormAddTodo = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 15px;

  .description {
    min-height: 100px;
    max-height: 250px;
    resize: vertical;
  }

  .links {
    position: relative;

    input {
      width: 100%;
      opacity: 0.2;
    }

    .alert {
      opacity: 0.4;
      cursor: default;
      position: absolute;
      user-select: none;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      height: 100%;
      font-size: 1.4rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background: radial-gradient(
        circle,
        rgba(0, 0, 0, 1) 0%,
        rgba(255, 255, 255, 0) 100%
      );
    }
  }
`

export const ButtonsModal = styled.div`
  margin-top: 15px;
  display: flex;
  gap: 15px;

  button {
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
