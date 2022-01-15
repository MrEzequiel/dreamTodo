import styled from 'styled-components'

interface ContainerProps {
  edit: boolean
}

export const TodoWrapper = styled.li<ContainerProps>`
  background: ${props => props.theme.colors.g3};
  border-radius: ${props => props.theme.borderRadius};
  border: 1px solid transparent;
  padding: 15px;

  border-color: ${({ edit }) => (edit ? '#11EEDD' : 'transparent')};

  display: flex;
  gap: 15px;

  transition: box-shadow 500ms cubic-bezier(0.075, 0.82, 0.165, 1);
  box-shadow: 0 4px 4px -2px rgba(0, 0, 0, 0.1);

  & + li {
    margin-top: 15px;
  }

  @keyframes show-down-todo {
    from {
      opacity: 0;
      transform: translateY(-30px);
    }
    to {
      opacity: initial;
      transform: translateY(0);
    }
  }

  animation: show-down-todo 1s cubic-bezier(0.075, 0.82, 0.165, 1);
  transition: all 500ms;

  &:hover {
    box-shadow: 0 8px 8px -3px rgba(0, 0, 0, 0.1);
  }

  p {
    align-self: center;
    line-height: 1.5em;
    width: 100%;
  }
`

export const InputCheckboxTodo = styled.label`
  flex-shrink: 0;
  user-select: none;

  input {
    cursor: pointer;
    appearance: none;
    background-color: transparent;
    margin: 0;

    color: ${props => props.theme.colors.colorPrimary};
    width: 25px;
    height: 25px;
    border: 2px solid ${props => props.theme.colors.colorPrimary};
    border-radius: 10px;
    transform: translateY(-0.075em);

    display: grid;
    place-content: center;

    transition: box-shadow 700ms;
    transition-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);

    &:checked {
      background: ${props => props.theme.colors.colorPrimary};
    }

    &:checked::before {
      transform: scale(1);
    }

    &::before {
      content: '';
      width: 12px;
      height: 12px;
      clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
      transform: scale(0);
      transform-origin: bottom left;
      transition: 120ms transform ease-in-out;
      box-shadow: inset 14px 14px ${props => props.theme.colors.g2};
    }

    &:hover {
      box-shadow: 0 0 0 4px ${props => props.theme.colors.colorPrimary2};
    }
  }
`

export const InputEditTodo = styled.input`
  width: 100%;
  line-height: 1.5em;
  font-size: 1.6rem;
  font-weight: 400;
  caret-color: ${props => props.theme.colors.colorPrimary};
`
