import styled from 'styled-components'
import { Container } from '../../../../styles/LayoutComponents'

export const TodoWrapper = styled.div`
  ${Container()}
  margin-bottom: 40px;
  padding-top: 10px;

  & > h2 {
    margin: 40px 0 20px;
    font-weight: 300;
    color: ${props => props.theme.colors.g7};

    strong {
      font-weight: 500;
      color: ${props => props.theme.colors.g6};
    }
  }

  ul {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`
