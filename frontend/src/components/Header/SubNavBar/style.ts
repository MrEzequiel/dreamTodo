import styled, { css } from 'styled-components'

export const SubNavBarWrapper = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  background: rgba(0, 0, 0, 0.6);
  z-index: 2;

  // enter animation
  &.SubNavBar-enter .nav {
    opacity: 0;
    transform: translateX(-300px);
  }
  &.SubNavBar-enter-active .nav {
    opacity: initial;
    transform: translateX(0);
    transition: opacity 400ms, transform 400ms;
    transition-timing-function: ease-in-out;
  }

  // exit animation
  &.SubNavBar-exit .nav {
    opacity: 1;
  }
  &.SubNavBar-exit-active .nav {
    opacity: 0;
    transform: translateX(-300px);
    transition: opacity 400ms, transform 400ms;
    transition-timing-function: ease-in-out;
  }
`

export const LoadingWrapper = styled.div`
  position: absolute;
  top: 20px;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  @keyframes show-down {
    from {
      transform: translateY(-40px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  animation: show-down 400ms ease-in-out;
`

export const SubNavBar = styled.div`
  width: min(300px, 90%);
  background: ${props => props.theme.colors.g2};
  border: 1px solid ${props => props.theme.colors.g3};
  height: 100%;
  max-height: 100vh;
  padding: 20px 0;
  border-radius: 0 0 ${props => props.theme.borderRadius} 0;
  box-shadow: 16px 0px 16px -4px rgba(0, 0, 0, 0.1);
`

export const SubNavBarHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin: 0 10px;
  padding-bottom: 20px;
  border-bottom: 1px solid ${props => props.theme.colors.g3};
`

export const ButtonCloseBar = styled.button`
  cursor: pointer;
  border-radius: 3px;
  border: 1px solid ${props => props.theme.colors.g3};

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3px;
  box-shadow: 0 4px 4px -1px rgba(0, 0, 0, 0.1);

  svg {
    color: ${props => props.theme.colors.g6};
  }
`

export const SubNavBarContent = styled.nav`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  a.active,
  a:hover {
    background: ${props => props.theme.colors.g3};
  }
`

export const CollectionsItems = styled.div<{ loading: boolean }>`
  width: 100%;
  padding: 15px 10px;

  display: flex;
  align-items: center;
  gap: 10px;

  color: ${props => props.theme.colors.g6};
  font-weight: 300;

  transition: opacity 400ms ease-in-out;

  > span {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${props => props.theme.colors.g1};
    border: 1px dashed ${props => props.theme.colors.g3};

    border-radius: 10px;
    font-size: 1.8rem;
  }

  ${props =>
    props.loading &&
    css`
      opacity: 0.5;
      pointer-events: none;

      * {
        pointer-events: none;
      }
    `}
`

export const EmptyCollections = styled.div`
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  svg {
    color: ${props => props.theme.colors.colorPrimary};
  }

  p {
    color: ${props => props.theme.colors.g7};
    margin-top: 5px;
    font-weight: 300;
  }
`
