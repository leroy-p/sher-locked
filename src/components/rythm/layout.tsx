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
  background-color: #000000;
  display: flex;
  flex-direction: row;
  justify-content: center;
  max-width: 600px;
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
  }

  .layout-side-orange {
    background-color: #e6b25e;
  }

  .layout-side-pink {
    background-color: #fa6666;
  }

  .layout-side-yellow {
    background-color: #e8e09b;
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

const ScoreContainer = styled.div`
  align-items: center;
  background-color: #343434;
  bottom: 0;
  display: flex;
  flex-direction: row;
  height: 48px;
  justify-content: space-between;
  left: 0;
  padding: 24px;
  position: absolute;
  width: 100%;

  & > p {
    text-transform: uppercase;
  }
`