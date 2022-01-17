import styled from 'styled-components'
import { Container } from '../../../../../styles/LayoutComponents'

export const EmptyStyle = styled.div`
  ${Container()}
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;

  @keyframes show-up-empty {
    from {
      opacity: 0;
      transform: translateY(-30px);
    }
    to {
      opacity: 1;
      transform: initial;
    }
  }

  animation: show-up-empty 1s cubic-bezier(0.075, 0.82, 0.165, 1);

  margin-top: 40px;

  svg {
    color: ${props => props.theme.colors.colorPrimary};
    transition: all 500ms cubic-bezier(0.075, 0.82, 0.165, 1);

    &:hover {
      transform: scale(1.2);
    }
  }

  p {
    font-weight: 300;
  }
`
