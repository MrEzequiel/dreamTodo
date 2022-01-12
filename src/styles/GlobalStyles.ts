import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  :root {
    scroll-behavior: smooth;
    font-size: 62.5%;
  }

  body {
    background: ${props => props.theme.colors.g2};
    color: ${props => props.theme.colors.g5};
    font: 400 1.6rem 'Lexend', sans-serif;
  }

  button,
  input,
  textarea {
    background: transparent;
    outline: none;
    border: none;
    color: inherit;
    font-family: inherit;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ol,
  ul {
    list-style: none;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  a,
  ul {
    font-size: 1em;
    font-weight: normal;
  }


  img {
    display: block;
    max-width: 100%;
  }
`
