import styled, { css } from 'styled-components'

interface ContainerProps {
  edit: boolean
  expended: boolean
  isDragging: boolean
}

export const TodoWrapper = styled.li<ContainerProps>`
  position: relative;
  width: 100%;
  background: ${props => props.theme.colors.g3};
  border-radius: ${props => props.theme.borderRadius};
  border: 2px solid transparent;
  padding: 15px;
  padding-left: 30px;

  border-color: ${({ edit }) => (edit ? '#11EEDD' : 'transparent')};
  border-radius: ${({ expended }) => (expended ? '15px 15px 0 0' : '15px')};

  display: flex;
  gap: 15px;

  transition: box-shadow 500ms, transform 500ms;
  transition-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);

  box-shadow: ${({ expended }) =>
    expended
      ? '0 8px 8px -2px rgba(0, 0, 0, 0.2)'
      : '0 4px 4px -2px rgba(0, 0, 0, 0.1)'};

  & + li {
    margin-top: 15px;
  }

  &:hover {
    box-shadow: 0 16px 16px -12px rgba(0, 0, 0, 0.15);
  }

  p {
    align-self: center;
    line-height: 1.5em;
    width: 100%;
    word-break: break-word;
  }

  ${({ isDragging }) =>
    isDragging &&
    css`
      transition: all 0.3s ease;
      cursor: grabbing;
      box-shadow: none;
      background: none;
      border-color: ${props => props.theme.colors.colorPrimary2};
      border-style: dashed;

      & > * {
        opacity: 0;
        transition: all 150ms ease;
      }
    `}

  @keyframes show-todo-left {
    from {
      opacity: 0;
      transform: translateX(-10px);
    }
    to {
      opacity: initial;

      transform: initial;
    }
  }

  animation: show-todo-left 400ms ease;
`

export const ButtonDrag = styled.button`
  cursor: grab;

  &:active {
    cursor: grabbing;
  }

  background: transparent;
  height: 100%;
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  top: 0;
  left: 0px;
  color: ${props => props.theme.colors.g4};
`

export const InputCheckboxTodo = styled.label`
  flex-shrink: 0;
  user-select: none;
  height: fit-content;

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

export const ButtonsControl = styled.div`
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`

export const ExpendedButton = styled.button<{ expended: boolean }>`
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  width: 25px;
  height: 25px;

  transition: background 500ms cubic-bezier(0.075, 0.82, 0.165, 1);

  svg {
    transition: transform 700ms cubic-bezier(0.075, 0.82, 0.165, 1);
  }
  ${({ expended }) =>
    expended &&
    css`
      background: ${props => props.theme.colors.g2};
    `}

  &:hover {
    background: ${props => props.theme.colors.g2};
  }
`

export const ExpendedTodo = styled.div`
  margin-bottom: 30px;
  background: ${props => props.theme.colors.g3};
  border-radius: ${props => props.theme.borderRadius};
  box-shadow: inset 0px 12px 16px -4px rgb(0, 0, 0, 0.15);
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border: 1px solid transparent;
  padding: 15px;

  display: flex;
  flex-direction: column;
  gap: 10px;

  @keyframes show-left {
    from {
      opacity: 0;
      margin-top: -30px;
    }
    to {
      opacity: initial;
      margin-top: 0px;
    }
  }

  animation: show-left 900ms cubic-bezier(0.075, 0.82, 0.165, 1) forwards;

  p {
    font-size: 1.6rem;
    font-weight: 300;
    color: ${props => props.theme.colors.g7};
    white-space: break-spaces;
  }
`

export const LinksWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  color: ${props => props.theme.colors.colorPrimary2};

  a {
    font-size: 1.4rem;
    svg {
      margin-right: 5px;
    }
    &:hover {
      color: ${props => props.theme.colors.colorPrimary};
      text-decoration: underline;
    }
  }
`
