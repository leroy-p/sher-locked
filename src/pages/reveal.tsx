import React from 'react'
import styled from 'styled-components'
import Layout from '../layout/public'

interface IProps {}

function Reveal(props: IProps) {
  return (
    <Layout>
      <>
          <Container>
              <img src="/assets/image/raccoon-1.gif" />
              <h2>Félicitations !</h2>
              <p className='subtitle'>Tu as mérité ton cadeau :</p>
              <img src="/assets/image/london.jpg" />
              <p className='result'>Un week-end à Londres !</p>
              <p className='info'>(à la date de ton choix)</p>
          </Container>
          <DesktopContainer>
              <img src="/assets/image/mobile.png" />
              <p>Jeu disponible uniquement sur mobile.</p>
          </DesktopContainer>
        </>
    </Layout>
  )
}

export default Reveal

const Container = styled.div`
  align-items: center;
  background: #159999;
  border-radius: 32px;
  border-bottom: 5px solid #0E5A5A;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 24px;
  padding: 24px;
  width: 300px;

  @media screen and (min-width: 820px) {
      display: none;
  }

  & > img:nth-child(1) {
    height: auto;
    margin-top: -72px;
    width: 70%;
  }

  & > img:nth-child(4) {
    border-radius: 16px;
    height: auto;
    margin: 24px 0;
    width: 100%;
  }

  & > h4 {
    font-size: 32px;
    font-weight: 700;
  }

  .subtitle {
    font-size: 19px;
    font-weight: 700;
    margin-bottom: 8px;
    text-align: center;
    width: 100%;
  }

  .result {
    font-size: 19px;
    font-weight: 700;
    text-align: center;
    width: 100%;
  }

  .info {
    font-size: 14px;
    text-align: center;
    font-style: italic;
  }
`

const DesktopContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: center;
  width: 100%;

  @media screen and (max-width: 820px) {
      display: none;
  }

  & > img {
    height: 96px;
    width: 96px;
  }

  & > p {
    font-size: 20px;
  }
`