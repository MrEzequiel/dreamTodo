import styled from 'styled-components'

export const FormAddTodo = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 15px;

  input,
  textarea {
    padding: 10px;
    border: 2px solid ${props => props.theme.colors.g2};
    border-radius: 10px;
    font-size: 1.6rem;
    font-weight: 300;
    color: ${props => props.theme.colors.g7};

    transition: border-color 1s, box-shadow 1s;
    transition-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
    &:focus {
      border-color: #11eedd;
      box-shadow: 0 0 0 4px #29b0a6;
    }
  }

  .description {
    min-height: 100px;
    max-height: 250px;
    resize: vertical;
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
