import styled from 'styled-components'
import { Container } from '../../styles/LayoutComponents'

export const HeaderWrapper = styled.header`
  box-shadow: 0 8px 8px -4px rgba(0, 0, 0, 0.1);
  background: ${props => props.theme.colors.g1};
  margin-bottom: 40px;

  .button-login {
    border: 2px dotted ${props => props.theme.colors.colorPrimary};
    padding: 8px 16px;
    margin-left: 20px;
    font-weight: 300;
    color: ${props => props.theme.colors.g7};
    height: auto;
  }
`

export const HeaderStyle = styled.div`
  ${Container()}
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;

  .left {
    display: flex;
    align-items: center;

    p {
      font-weight: 300;
      color: ${props => props.theme.colors.g7};
    }
  }
`
