import styled from 'styled-components'

export const FormStyled = styled.form`
  position: relative;
  background: ${props => props.theme.colors.g3};
  border-radius: ${props => props.theme.borderRadius};
  display: flex;
  gap: 10px;
  align-items: center;
  width: 100%;
  height: 70px;
  padding: 0 15px;

  .select-emoji {
    cursor: pointer;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${props => props.theme.colors.g2};
    border-radius: 5px;
    box-shadow: 0 4px 4px -1px rgba(0, 0, 0, 0.1);
    border: 1px solid ${props => props.theme.colors.g1};
  }

  & > input {
    flex: 1;
    height: 100%;
    padding: 10px 0;
    background: transparent;
    font-size: 1.8rem;
    caret-color: ${props => props.theme.colors.colorPrimary};
  }

  .button-submit {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: ${props => props.theme.borderRadius};
    width: 30px;
    height: 30px;
    background: ${props => props.theme.colors.colorPrimary};

    svg {
      color: ${props => props.theme.colors.g1};
    }
  }

  .close-form {
    position: absolute;
    top: -50px;
    right: 0;
    cursor: pointer;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    transition: background 500ms cubic-bezier(0.075, 0.82, 0.165, 1);

    &:hover {
      background: ${props => props.theme.colors.g2};
    }
  }
`
