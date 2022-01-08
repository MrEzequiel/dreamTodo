import { css } from 'styled-components'

export const Container = () => css`
  margin: 0 auto;
  max-width: ${props => props.theme.container};
  padding-left: 20px;
  padding-right: 20px;
`
