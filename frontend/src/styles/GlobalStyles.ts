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

  ::-webkit-scrollbar {
    width: 1rem;
    background-color: #1b1919;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 5px;
    border: 3px solid #1b1919;
    box-shadow: inset 0 0 6px rgb(0 0 0 / 30%);
    background: linear-gradient(to bottom, ${props =>
      props.theme.colors.colorPrimary}, ${props =>
  props.theme.colors.colorPrimary2});
  }

  body {
    background: ${props => props.theme.colors.g2};
    color: ${props => props.theme.colors.g5};
    font: 400 1.6rem 'Lexend', sans-serif;
  }

  iframe {
    display: none !important;
  }

  #root {
    min-height: 100vh;
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
