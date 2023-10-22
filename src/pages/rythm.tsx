import React, { useState } from 'react'
import styled from 'styled-components'
import { rythmConfig } from '../data/rythm-config'

import { useRythm } from '../hooks/use-rythm'
import { RoutePath, generateRoutePath } from '../app/router-config'
import Layout from '../components/rythm/layout'
import Button from '../components/rythm/button'
import Dialog from '../components/dialog'

interface IProps {}

function Rythm(props: IProps) {
    const { countdown, started, currentTimer, score, personalBest, streak, showDialog, start, incrementScore, resetStreak, end, setShowDialog } = useRythm()
    const [loading, setLoading] = useState<boolean>(true)

    return (
        <Layout end={end} score={score} setLoading={setLoading} streak={streak}>
            <Container onClick={!started && !loading ? start : undefined}>
                <img src="/assets/image/raccoon.png" />
                {started && !loading ? (
                    rythmConfig.rythmButtons.map((button, index) => (
                        <Button
                            action={incrementScore}
                            currentTimer={currentTimer}
                            data={button}
                            key={index}
                            resetStreak={resetStreak}
                        />
                    ))
                ) : (
                    <>
                        {!loading && <p className='start'>Toucher l'écran pour commencer</p>}
                        {loading && <p className='loading'>Chargement...</p>}
                    </>
                )}
                {started && countdown > 0 && (
                    <CountdownContainer>
                        <p>{countdown}</p>
                    </CountdownContainer>
                )}
                <Dialog
                    action={{ label: 'Quitter', path: generateRoutePath(RoutePath.ROOT, {})}}
                    close={{ label: 'Rejouer', action: () => setShowDialog(false) }}
                    title="Partie terminée"
                    texts={[`Score : ${score}`, `Record personnel : ${personalBest}`]}
                    visible={showDialog}
                />
            </Container>
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

  & > img {
    /* animation: raccoonDanceAnim 1200ms infinite ease-in-out; */
    left: 35%;
    height: auto;
    position: absolute;
    top: 48px;
    width: 30%;
  }

  .start {
    font-size: 18px;
    text-align: center;
    text-transform: uppercase;
    width: 200px;
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

  & > p {
    font-size: 72px;
  }
`