import React  from 'react'
import styled from 'styled-components'
import Div100vh from 'react-div-100vh'

interface IProps {
    children: JSX.Element
    streak: number
    score: number
    end: () => void
    setLoading: (value: boolean) => void
}

function Layout({ children, streak, score, end, setLoading }: IProps) {
  return (
      <Container>
        <SideContainer>
            <div className='layout-side-blue' />
            <div className='layout-side-orange' />
            <div className='layout-side-pink' />
            <div className='layout-side-yellow' />
        </SideContainer>
        <MainContainer>
            {children}
        </MainContainer>
        <SideContainer>
            <div className='layout-side-blue' />
            <div className='layout-side-orange' />
            <div className='layout-side-pink' />
            <div className='layout-side-yellow' />
        </SideContainer>
        <audio
            id='music-player'
            playsInline src='/assets/audio/professor-layton.mp3'
            onEnded={() => setTimeout(end, 1000)} onLoadedData={() => setLoading(false)}
        />
      </Container>
  )
}

export default Layout

const Container = styled(Div100vh)`
  align-items: center;
  background: linear-gradient(180deg, rgba(132, 138, 187, 0.30) 0%, rgba(0, 0, 0, 0.21) 100%), #3E4366;
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: relative;
  width: 100vw;
`


const SideContainer = styled(Div100vh)`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: flex-end;
  width: 8px;

  & > div {
    height: 100px;
    width: 100%;
  }

  .layout-side-blue {
    background-color: #5cb1ed;

    @media screen and (min-width: 820px) {
      background-color: transparent;
    }
  }

  .layout-side-orange {
    background-color: #e6b25e;

    @media screen and (min-width: 820px) {
      background-color: transparent;
    }
  }

  .layout-side-pink {
    background-color: #fa6666;

    @media screen and (min-width: 820px) {
      background-color: transparent;
    }
  }

  .layout-side-yellow {
    background-color: #e8e09b;

    @media screen and (min-width: 820px) {
      background-color: transparent;
    }
  }
`

const MainContainer = styled(Div100vh)`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  width: calc(100% - 16px);
`