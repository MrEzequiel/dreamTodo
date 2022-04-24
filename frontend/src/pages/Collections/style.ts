import styled from 'styled-components'
import ButtonStyle from '../../styles/ButtonStyle'
import { Container } from '../../styles/LayoutComponents'

export const CollectionWrapper = styled.div`
  ${Container()}
  padding-bottom: 130px;

  .add-collection {
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    bottom: 40px;

    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px;
    height: auto;
    color: ${props => props.theme.colors.g1};

    @keyframes anime-down {
      from {
        opacity: 0;
        transform: translateX(-50%) translateY(100px);
      }
      to {
        opacity: initial;
        transform: translateX(-50%);
      }
    }

    animation: anime-down 1.5s cubic-bezier(0.075, 0.82, 0.165, 1);
    transition: all 700ms cubic-bezier(0.075, 0.82, 0.165, 1);

    &:hover {
      box-shadow: 0 8px 8px -2px rgba(0, 0, 0, 0.1);
      transform: translateX(-50%) scale(1.08);
    }
  }
`
