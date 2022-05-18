import styled, { css } from 'styled-components'

export const DropdownWrapper = styled.aside`
  flex-shrink: 0;
  position: relative;
`

interface IButton {
  active?: boolean
}

export const ButtonDropdown = styled.button<IButton>`
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  width: 25px;
  height: 25px;

  transition: background 500ms cubic-bezier(0.075, 0.82, 0.165, 1);

  ${({ active }) =>
    active &&
    css`
      background: ${props => props.theme.colors.g2};
    `}

  &:hover {
    background: ${props => props.theme.colors.g2};
  }
`

export const DropdownStyle = styled.div`
  position: absolute;
  z-index: 9999;
  overflow: hidden;
  top: 22px;
  right: 10px;
  box-shadow: 0 8px 8px -4px rgba(0, 0, 0, 0.1);

  width: auto;
  border-radius: ${props => props.theme.borderRadius};
  background: ${props => props.theme.colors.g1};

  transition: transform 400ms, opacity 400ms;
  transition-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);

  // enter animation
  &.DropdownStyle-enter {
    transform: perspective(100vmax) translateZ(150px) rotateX(40deg);
    opacity: 0;
  }
  &.DropdownStyle-enter-active {
    transform: perspective(100vmax) translateZ(0px) rotateX(0deg);
    opacity: 1;
  }
  // exit animation
  &.DropdownStyle-exit {
    transform: perspective(100vmax) translateZ(0px) rotateX(0deg);
    opacity: 1;
  }
  &.DropdownStyle-exit-active {
    opacity: 0;
    transform: perspective(100vmax) translateZ(-80px) rotateX(-20deg);
  }
`

export const DropdownItens = styled.div`
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;

  width: 100%;
  height: 50px;
  font-size: 1.4rem;
  font-weight: 300;
  padding: 0 8px;
  transition: background 500ms cubic-bezier(0.075, 0.82, 0.165, 1);

  & + div::before {
    /* border-top: 1px solid ${props => props.theme.colors.colorPrimary2}; */
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    margin: 0 8px;
    width: 85%;
    height: 1px;
    display: block;
    background: ${props => props.theme.colors.colorPrimary2};
  }

  &:hover {
    background: ${props => props.theme.colors.g4};
  }

  svg {
    color: ${props => props.theme.colors.colorPrimary};
  }
`
