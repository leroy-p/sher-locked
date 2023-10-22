import { createGlobalStyle } from "styled-components"
import { ITheme } from "./context/theme/hook"

const GlobalStyle = createGlobalStyle<{ theme: ITheme }>`
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  align-items: center;
  background-color: #343434;
  display: flex;
  flex-direction: column;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  justify-content: center;
}

h1, h2, h3, h4, h5, h6, p, input, button{
  color: ${({ theme }) => theme.palette.text.main};
  font-family: 'Roboto', sans-serif;
  letter-spacing: normal;
  line-height: normal;
  margin: 0;
}

input {
    background-color: transparent;
    font-size: 18px;
    height: 48px;
    padding: 0 16px;
    outline: none;
  }

p.error {
  color: ${({ theme }) => theme.palette.error.main};
}

a {
  cursor: pointer;
  font-family: 'Roboto', sans-serif;
  text-decoration: none;
}

button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-family: 'Roboto', sans-serif;
  outline:none;
  padding: 0;
}

input {
  border-radius: 0;
}

input:focus {
  outline: none;
}

textarea:focus {
  outline: none;
}
`

export default GlobalStyle