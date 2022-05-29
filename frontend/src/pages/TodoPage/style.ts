import styled from 'styled-components'
import { Container } from '../../styles/LayoutComponents'

export const TitleStyle = styled.div`
  ${Container()}
  margin-bottom: 20px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  .title,
  .icon-loading {
    display: flex;
    align-items: center;
  }

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

  h1 {
    font-size: 3.2rem;
    font-weight: 700;
    display: flex;
    align-items: center;

    span {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 5px;
    }
  }
`

export const LoadingContainer = styled.div`
  ${Container()}

  height: 70vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  justify-content: center;
`
