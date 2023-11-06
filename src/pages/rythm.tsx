import React, { useState } from 'react'
import styled from 'styled-components'
import { rythmConfig } from '../data/rythm-config'

import { useRythm } from '../hooks/use-rythm'
import { RoutePath, generateRoutePath } from '../app/router-config'
import Layout from '../components/rythm/layout'
import Button from '../components/rythm/button'
import ScoreDialog from '../components/score-dialog'
import Div100vh from 'react-div-100vh'

interface IProps {}

function Rythm(props: IProps) {
    const { countdown, started, currentTimer, score, personalBest, streak, showDialog, start, incrementScore, resetStreak, end, setShowDialog } = useRythm()
    const [loading, setLoading] = useState<boolean>(true)

    return (
        <Layout end={end} score={score} setLoading={setLoading} streak={streak}>
            <>
              <Container onClick={!started && !loading ? start : undefined}>
                  <img src="/assets/image/raccoon-5.png" />
                  {started && !loading && (
                      rythmConfig.rythmButtons.map((button, index) => (
                          <Button
                              action={incrementScore}
                              currentTimer={currentTimer}
                              data={button}
                              key={index}
                              resetStreak={resetStreak}
                          />
                      ))
                  )}
                  <StartDialogContainer visible={!started || loading}>
                      <img src="/assets/image/raccoon-4.png" />
                      {!loading && (
                        <>
                          <p className='start'>Touche l'écran pour commencer</p>
                          <p className='info'>(active le son)</p>
                        </>
                      )}
                      {loading && <p className='loading'>Chargement...</p>}
                  </StartDialogContainer>
                  {started && countdown > 0 && (
                      <CountdownContainer>
                          <p>{countdown}</p>
                      </CountdownContainer>
                  )}
                  <ScoreDialog
                      action={{ label: 'Continuer', path: generateRoutePath(RoutePath.ROOT, {})}}
                      close={{ label: 'Rejouer', action: () => setShowDialog(false) }}
                      personalBest={personalBest}
                      score={score}
                      title="Score"
                      visible={showDialog}
                  />
              </Container>
              <DesktopContainer>
                  <img src="/assets/image/mobile.png" />
                  <p>Jeu disponible uniquement sur mobile.</p>
              </DesktopContainer>
            </>
        </Layout>
  )
}

export default Rythm

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  position: relative;
  width: 100%;

  @media screen and (min-width: 820px) {
      display: none;
  }

  & > img {
    /* animation: raccoonDanceAnim 1200ms infinite ease-in-out; */
    width: 300px;
    height: auto;
    position: absolute;
    top: 48px;
    width: 30%;
  }

  .start {
    font-size: 20px;
    font-weight: 700;
    text-align: center;
  }

  .info {
    font-size: 14px;
    text-align: center;
    font-style: italic;
  }

  @keyframes raccoonDanceAnim {
    0% {
      transform: rotateY(-15deg);
    }
    50% {
      transform: rotateY(15deg);
    }
    100% {
      transform: rotateY(-15deg);
    }
  }
`

const CountdownContainer = styled.div`
  align-items: center;
  bottom: 0;
  display: flex;
  flex-direction: row;
  height: 100%;
  justify-content: center;
  left: 0;
  position: absolute;
  width: 100%;

  @media screen and (min-width: 820px) {
      display: none;
  }

  & > p {
    font-size: 72px;
  }
`

const StartDialogContainer = styled(Div100vh)<{ visible: boolean }>`
    align-items: center;
    background: linear-gradient(180deg, rgba(132, 138, 187, 0.30) 0%, rgba(0, 0, 0, 0.21) 100%), #3E4366;
    display: flex;
    flex-direction: column;
    justify-content: center;
    left: 0;
    opacity: ${({ visible }) => visible ? '1' : '0'};
    pointer-events: ${({ visible }) => visible ? 'auto' : 'none'};
    position: fixed;
    transition: opacity 500ms ease-in-out;
    top: 0;
    width: 100vw;
    z-index: 10;

    @media screen and (min-width: 820px) {
      display: none;
    }

    & > img {
      height: auto;
      margin-bottom: 24px;
      margin-top: -120px;
      width: 232px;
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