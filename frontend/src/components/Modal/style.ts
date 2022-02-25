import styled from 'styled-components'

export const ModalWrapper = styled.div`
  height: 100vh;
  width: 100%;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  background: rgba(0, 0, 0, 0.55);

  display: flex;
  align-items: center;
  justify-content: center;

  // enter animation
  &.modal-enter {
    opacity: 0;

    .modal-content {
      opacity: 0;
      transform: scale(0.8);
    }
  }
  &.modal-enter-active {
    opacity: 1;
    transition: opacity 400ms ease;

    .modal-content {
      opacity: 1;
      transform: scale(1);
      transition: opacity 400ms, transform 400ms;
      transition-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
    }
  }

  // exit animation
  &.modal-exit {
    opacity: 1;

    .modal-content {
      opacity: 1;
    }
  }
  &.modal-exit-active {
    opacity: 0;
    transition: opacity 400ms ease;

    .modal-content {
      opacity: 0;
      transform: scale(0.8);
      transition: opacity 400ms, transform 400ms;
      transition-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
    }
  }
`

interface IModalContent {
  size?: string
}

export const ModalContent = styled.div<IModalContent>`
  width: ${props => props.size ?? 'auto'};
  max-height: 90%;
  background: ${props => props.theme.colors.g3};
  border-radius: ${props => props.theme.borderRadius};
  padding: 15px;
  overflow: hidden;
  position: relative;
  padding: 30px 20px;
`
