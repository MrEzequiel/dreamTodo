import styled from 'styled-components'
import patternCard from '../assets/pattern-card.png'

export const CardWrapper = styled.div`
  flex-shrink: 0;
  min-height: 260px;
  height: max-content;

  border-radius: ${props => props.theme.borderRadius};
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  background: ${props => props.theme.colors.g3};
  color: ${props => props.theme.colors.g7};

  @keyframes animeCard {
    from {
      opacity: 0;
      transform: translateX(-50px);
    }

    to {
      opacity: initial;
      transform: initial;
    }
  }

  animation: animeCard 1000ms cubic-bezier(0.075, 0.82, 0.165, 1);

  transform: perspective(100vmax) translateZ(0px) rotateX(0deg);
  transition: all 1.2s cubic-bezier(0.075, 0.82, 0.165, 1);

  &:hover {
    transform: perspective(100vmax) translateZ(35px) rotateX(5deg);
    box-shadow: 0 16px 16px -2px rgba(0, 0, 0, 0.1);
  }

  .upper {
    position: relative;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    font-size: 4.2rem;
    padding-bottom: 20px;

    background: ${props => props.theme.colors.g4};
    border-radius: ${props => props.theme.borderRadius};
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    height: 150px;
    background-image: url(${patternCard});
    box-shadow: inset 0px -33px 20px -15px ${props => props.theme.colors.g3};

    aside {
      position: absolute;
      top: 10px;
      right: 10px;
    }
  }

  .down {
    padding: 10px;

    h2 {
      color: ${props => props.theme.colors.g5};
      font-size: 1.8rem;
      max-width: 100%;
      text-overflow: ellipsis;

      a {
        font-weight: 500;
        color: ${props => props.theme.colors.colorPrimary};
        &:hover {
          text-decoration: underline;
        }
      }
    }

    & > p {
      margin: 5px 0 15px;
    }
  }
`
interface IProps {
  quant: string
}

export const Porcetage = styled.div<IProps>`
  display: flex;
  align-items: center;
  gap: 10px;

  p {
    font-size: 1.4rem;
    font-weight: 300;
  }

  span {
    position: relative;
    width: 100%;
    height: 10px;
    background: ${props => props.theme.colors.g2};
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    overflow: hidden;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      width: ${props => props.quant};
      height: 100%;
      border-radius: 4px;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
      background: ${props => props.theme.colors.colorPrimary};
    }
  }
`

export const ControlsButton = styled.div`
  margin-top: 30px;
  display: flex;
  gap: 15px;
`
