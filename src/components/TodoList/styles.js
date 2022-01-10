import styled from 'styled-components'
import { Container } from '../../styles/LayoutComponents'

export const TodoWrapper = styled.div`
  ${Container()}
  margin-bottom: 40px;

  h2 {
    margin: 40px 0 20px;
  }
`

export const TodoListWrapper = styled.ul`
  margin-top: 20px;
`
