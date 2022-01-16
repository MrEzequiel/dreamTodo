import styled from 'styled-components'
import { Container } from '../../styles/LayoutComponents'

export const HeaderWrapper = styled.header`
  box-shadow: 0 8px 8px -4px rgba(0, 0, 0, 0.1);
  background: ${props => props.theme.colors.g1};
  margin-bottom: 40px;
`

export const HeaderStyle = styled.div`
  ${Container()}
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
`

export const LogoDreamTodo = styled.h1`
  font-size: 2.6rem;
  font-weight: 300;
  color: ${props => props.theme.colors.g7};

  span {
    font-weight: 700;
    background: linear-gradient(
      to right,
      ${props => props.theme.colors.colorPrimary2},
      ${props => props.theme.colors.colorPrimary}
    );
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`

export const ButtonAccount = styled.button`
  cursor: pointer;
  border: 2px dotted ${props => props.theme.colors.colorPrimary};
  padding: 8px 16px;
  border-radius: ${props => props.theme.borderRadius};
  color: ${props => props.theme.colors.g7};
  font-weight: 300;
  overflow: hidden;
  z-index: 1;

  transition: all 700ms ease;

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 ${props => props.theme.colors.colorPrimary};
    }
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 0%;
    width: 0%;
    background: ${props => props.theme.colors.colorPrimary};
    transition: all 700ms;
    z-index: 0;
  }

  &:hover {
    border-style: solid;
    animation: pulse 1.5s cubic-bezier(0.075, 0.82, 0.165, 1);
    box-shadow: 0 0 0 2em rgba(255, 255, 255, 0);
  }
`
