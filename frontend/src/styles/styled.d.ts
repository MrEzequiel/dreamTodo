import 'styled-components'
import darkTheme from './theme/dark'

export type Theme = typeof darkTheme

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
