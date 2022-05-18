import styled, { css } from 'styled-components'
import { Container } from '../../../../styles/LayoutComponents'

export const FormWrapper = styled.div`
  position: relative;
  ${Container()}
`

export const FormStyle = styled.form<{ inFocus: boolean }>`
  display: flex;
  gap: 15px;
  align-items: center;
  height: 65px;
  border: 2px solid ${props => props.theme.colors.g1};
  border-radius: ${props => props.theme.borderRadius};
  padding: 0 15px;

  transition: border-color 500ms, box-shadow 700ms;
  transition-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);

  ${({ inFocus }) =>
    inFocus &&
    css`
      border-color: ${props => props.theme.colors.colorPrimary};
      box-shadow: 0 0 0 4px ${props => props.theme.colors.colorPrimary2};
    `}

  background: ${props => props.theme.colors.g2};
`

export const InputStyle = styled.input`
  order: 2;
  height: 100%;
  width: 100%;
  font-size: 1.8rem;
`

export const ButtonStyle = styled.button`
  cursor: pointer;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme.colors.colorPrimary};
  border-radius: 10px;
  width: 30px;
  height: 30px;
  color: ${props => props.theme.colors.g1};
`

export const MoreInformation = styled.a`
  cursor: pointer;
  position: absolute;
  bottom: -25px;
  left: 20px;
  z-index: 0;
  overflow: hidden;

  text-decoration: underline;
  font-size: 1.4rem;
  font-weight: 300;
  color: ${props => props.theme.colors.g7};

  --speed: 700ms;

  &.collapse-enter {
    max-height: 0;
  }
  &.collapse-enter-active {
    max-height: 100px;
    transition: max-height var(--speed);
    transition-timing-function: ease-in-out;
  }

  // exit animation
  &.collapse-exit {
    max-height: 100px;
  }
  &.collapse-exit-active {
    max-height: 0;
    transition: max-height 400ms;
    transition-timing-function: ease-in-out;
  }
`
