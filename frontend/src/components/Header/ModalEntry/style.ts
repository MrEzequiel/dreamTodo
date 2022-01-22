import styled from 'styled-components'

export const Container = styled.div`
  --speed: 700ms;
  transition: height var(--speed) ease;

  .sign-in-enter {
    width: 90%;
    position: absolute;
    transform: translateX(-130%);
  }
  .sign-in-enter-active {
    width: 90%;
    transform: translateX(0%);
    transition: all var(--speed) ease;
  }
  .sign-in-exit {
    position: absolute;
    width: 90%;
  }
  .sign-in-exit-active {
    width: 90%;
    transform: translateX(-130%);
    transition: all var(--speed) ease;
  }

  .sign-up-enter {
    transform: translateX(130%);
  }
  .sign-up-enter-active {
    transform: translateX(0%);
    transition: all var(--speed) ease;
  }
  .sign-up-exit-active {
    transform: translateX(130%);
    transition: all var(--speed) ease;
  }
`
