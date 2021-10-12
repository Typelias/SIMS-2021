import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
*,
*::after,
*::before {
  box-sizing: border-box;
}
body {
  background: '#302C40';
  color: '#FFF';
  height: 100vh;
  margin: 0;
  padding: 0;
  font-family: 'Roboto', sans-serif;
  transition: all 0.25s linear;
}
`

