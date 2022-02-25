import styled from 'styled-components'
import { SeparatorTitle } from './LayoutComponents'

interface ITitle {
  size: string
  weight?: string
  separator?: boolean
}

const Title = styled.h2<ITitle>`
  font-size: ${props => props.size};
  font-weight: ${props => props.weight ?? 700};

  ${props => props.separator && SeparatorTitle()}
`

export default Title
