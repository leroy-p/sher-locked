import React from 'react'
import styled from 'styled-components'
import Layout from '../components/reveal/layout'

interface IProps {}

function Reveal(props: IProps) {
  return (
    <Layout>
        <Container>
            <img src="/assets/image/raccoon.png" />
            <h2>Félicitations !</h2>
            <p>Tu as mérité ton cadeau :</p>
            <img src="/assets/image/london.jpg" />
            <p>Un week-end à Londres à la date de ton choix !</p>
        </Container>
    </Layout>
  )
}

export default Reveal

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 8px;
  justify-content: center;
  position: relative;
  padding: 48px 0;
  width: 100%;

  & > img:nth-child(1) {
    height: auto;
    margin-bottom: 40px;
    width: 30%;
  }

  & > img:nth-child(4) {
    height: auto;
    margin: 24px 0;
    width: 80%;
  }
`
