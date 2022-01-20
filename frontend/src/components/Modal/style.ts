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
`

export const ModalContent = styled.div`
  max-height: 80%;
  background: ${props => props.theme.colors.g3};
  border-radius: ${props => props.theme.borderRadius};
  padding: 15px;
  overflow-y: auto;
  padding: 30px 20px;

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
`
