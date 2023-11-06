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
  background-color: #000000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  width: 100vw;
`

