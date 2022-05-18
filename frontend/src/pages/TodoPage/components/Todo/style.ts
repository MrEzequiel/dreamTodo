import styled, { css } from 'styled-components'

interface ContainerProps {
  edit: boolean
  expended: boolean
  isLoading: boolean
}

export const TodoWrapper = styled.li<ContainerProps>`
  position: relative;
  width: 100%;
  background: ${props => props.theme.colors.g3};
  border-radius: ${props => props.theme.borderRadius};
  border: 2px solid transparent;
  padding: 15px;

  border-color: ${({ edit }) => (edit ? '#11EEDD' : 'transparent')};
  border-radius: ${({ expended }) => (expended ? '15px 15px 0 0' : '15px')};

  display: flex;
  gap: 15px;

  opacity: ${({ isLoading }) => (isLoading ? 0.4 : 1)};
  & * {
    pointer-events: ${({ isLoading }) => (isLoading ? 'none' : 'all')};
  }

  @keyframes show-left {
    from {
      transform: translateX(-20px);
      opacity: 0;
    }

    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  animation: show-left 500ms ease;

  transition: box-shadow 500ms, transform 500ms, opacity 300ms,
    border-radius 500ms;
  transition-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);

  box-shadow: ${({ expended }) =>
    expended
      ? '0 8px 8px -2px rgba(0, 0, 0, 0.2)'
      : '0 4px 4px -2px rgba(0, 0, 0, 0.1)'};

  &:hover {
    box-shadow: 0 16px 16px -12px rgba(0, 0, 0, 0.15);
  }

  p {
    align-self: center;
    line-height: 1.5em;
    width: 100%;
    word-break: break-word;
  }
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
  margin-top: -22px;
  margin-bottom: 10px;

  background: ${props => props.theme.colors.g3};
  border-radius: ${props => props.theme.borderRadius};
  box-shadow: inset 0px 12px 16px -4px rgb(0, 0, 0, 0.15);

  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border: 1px solid transparent;

  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow: hidden;

  & > div {
    padding: 15px;
    padding-top: 25px;
  }

  --speed: 600ms;
  &.expended-enter {
    max-height: 0;
  }
  &.expended-enter-active {
    max-height: 100px;
    transition: max-height var(--speed);
    transition-timing-function: ease-in-out;
  }

  // exit animation
  &.expended-exit {
    max-height: 100px;
  }
  &.expended-exit-active {
    max-height: 0;
    transition: max-height var(--speed);
    transition-timing-function: ease-in-out;
  }

  p {
    font-size: 1.6rem;
    font-weight: 300;
    color: ${props => props.theme.colors.g8};
    white-space: break-spaces;
    word-break: break-word;

    & > span {
      white-space: break-spaces;
      word-break: break-word;
      color: ${props => props.theme.colors.g8};
    }
  }

  .more {
    cursor: pointer;
    font-size: 1.4rem;
    font-weight: 300;

    color: ${props => props.theme.colors.colorPrimary};
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
