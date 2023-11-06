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
  background: linear-gradient(180deg, rgba(132, 138, 187, 0.30) 0%, rgba(0, 0, 0, 0.21) 100%), #3E4366;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  width: 100vw;
`

