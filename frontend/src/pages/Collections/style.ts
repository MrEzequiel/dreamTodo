import styled from 'styled-components'
import { Container } from '../../styles/LayoutComponents'

export const CollectionWrapper = styled.div`
  ${Container()}
  padding-bottom: 130px;

  h1 {
    display: flex;
    align-items: center;

    font-size: 3.2rem;
    font-weight: 700;
    margin-bottom: 15px;

    &::before {
      content: '';
      margin-right: 10px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: ${props => props.theme.colors.colorPrimary};
    }
  }
`

export const ButtonAddCollection = styled.button`
  cursor: pointer;
  position: fixed;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  bottom: 40px;
  text-align: center;

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
  border-radius: ${props => props.theme.borderRadius};
  background: linear-gradient(
    to right,
    ${props => props.theme.colors.colorPrimary2},
    ${props => props.theme.colors.colorPrimary}
  );
  color: ${props => props.theme.colors.g1};

  @keyframes anime-down {
    from {
      opacity: 0;
      transform: translateY(100px);
    }
    to {
      opacity: initial;
      transform: initial;
    }
  }

  animation: anime-down 1.5s cubic-bezier(0.075, 0.82, 0.165, 1);
  transition: all 700ms cubic-bezier(0.075, 0.82, 0.165, 1);

  &:hover {
    box-shadow: 0 8px 8px -2px rgba(0, 0, 0, 0.1);
    transform: scale(1.08);
  }
`
