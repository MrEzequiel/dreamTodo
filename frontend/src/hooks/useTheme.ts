import { useContext } from 'react'
import { ThemeContext } from 'styled-components'

const useTheme = () => {
  const theme = useContext(ThemeContext)
  return theme
}

export default useTheme
