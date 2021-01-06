import styled from 'styled-components'

export const Login = styled.div.attrs({
  className: 'Login'
})`
  display: grid;
  width: 100%;
  align-content: center;
  grid-template-rows: max-content 121px;
  height: 100vh;
  justify-content: center;
`

export const LoginHeader = styled.h1.attrs({
  className: 'LoginHeader'
})`
  font-size: 45px;
`