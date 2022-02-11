import styled from 'styled-components'

export const TodoDragLayerWrapper = styled.div`
  position: fixed;
  pointer-events: none;
  z-index: 100;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  cursor: grabbing;
  transform: scale(1.025);
  opacity: 0.92;

  &.fade-enter {
    opacity: 0;
    transform: scale(1);

    .layer-item {
      transform: rotate(0);
    }
  }
  &.fade-enter-active {
    opacity: 0.92;
    transform: scale(1.025);
    transition: opacity 300ms, transform 300ms;
    transition-timing-function: ease-in-out;

    .layer-item {
      transform: rotate(-0.85deg);
      transition: opacity 300ms, transform 300ms;
      transition-timing-function: ease-in-out;
    }
  }

  &.fade-exit {
    opacity: 0.92;

    .layer-item {
      transform: rotate(0);
    }
  }
  &.fade-exit-active {
    opacity: 0;
    transform: scale(1.025);
    transition: opacity 300ms, transform 300ms;
    transition-timing-function: ease-in-out;

    .layer-item {
      transform: rotate(-0.85deg);
      transition: opacity 300ms, transform 300ms;
      transition-timing-function: ease-in-out;
    }
  }
`

export const LayerItem = styled.div`
  transform: rotate(-0.85deg);
  cursor: grabbing;
  box-shadow: 0 0px 16px 4px rgba(0, 0, 0, 0.5);
  border-radius: ${props => props.theme.borderRadius};
`
