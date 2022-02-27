import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string

    container: string
    borderRadius: string
    colors: {
      colorPrimary: string
      colorPrimary2: string
      colorError: string
      g1: string
      g2: string
      g3: string
      g4: string
      g5: string
      g6: string
      g7: string
    }
  }
}
