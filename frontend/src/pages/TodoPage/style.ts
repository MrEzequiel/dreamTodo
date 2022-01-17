import styled from 'styled-components'
import { Container } from '../../styles/LayoutComponents'

export const TitleStyle = styled.h1`
  ${Container()}
  font-size: 3.2rem;
  font-weight: 700;
  margin-bottom: 15px;
  display: flex;
  align-items: center;

  button {
    margin-right: 15px;
    cursor: pointer;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${props => props.theme.colors.g3};
    border-radius: ${props => props.theme.borderRadius};
    color: ${props => props.theme.colors.g7};
  }
`
