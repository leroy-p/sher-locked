import React  from 'react'
import styled from 'styled-components'
import Div100vh from 'react-div-100vh'

interface IProps {
    children: JSX.Element
}

function Layout({ children }: IProps) {
  return (
      <Container>
          {children}
      </Container>
  )
}

export default Layout

const Container = styled(Div100vh)`
  align-items: center;
  background-color: #86d2d7;
  background-image: url('/assets/image/raccoon-pattern.png');
  background-position: center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  mix-blend-mode: multiply;
  padding: 0 32px;
  position: relative;
  width: 100vw;
`