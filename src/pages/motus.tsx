import React from 'react'
import styled from 'styled-components'

import Layout from '../components/motus/layout'
import ScoreDialog from '../components/score-dialog'
import { useMotus } from '../hooks/use-motus'
import { RoutePath, generateRoutePath } from '../app/router-config'

interface IProps {}

function Motus(props: IProps) {
    const {
        attemps,
        results,
        foundLetters,
        success,
        failure,
        score,
        personalBest,
        showDialog,
        addLetter,
        removeLetter,
        submitAttempt,
        next,
        restart,
    } = useMotus()

    return (
      <Layout
        addLetter={addLetter}
        failure={failure}
        foundLetters={foundLetters}
        next={next}
        removeLetter={removeLetter}
        submitAttempt={submitAttempt}
        success={success}
    >
        <>
          <Container>
            <img src="/assets/image/raccoon-5.png" />
            <GridContainer>
                {attemps.map((attempt, attempIndex) => (
                    <div key={attempIndex}>
                        {attempIndex > results.length - 1 && attempt.map((letter, letterIndex) => (
                            <LetterContainer
                                index={letterIndex}
                                key={letterIndex}
                                totalIndex={attempIndex * attemps[0].length + letterIndex}
                                totalLength={attemps.length * attemps[0].length}
                                wordLength={attemps[0].length}
                            >
                                <p>{letter}</p>
                            </LetterContainer>
                        ))}
                        {attempIndex < results.length && results[attempIndex].map((item, itemIndex) => (
                            <LetterContainer
                                index={itemIndex}
                                isPerfect={item.isPerfect}
                                isCorrect={item.isCorrect}
                                key={itemIndex}
                                totalIndex={attempIndex * attemps[0].length + itemIndex}
                                totalLength={attemps.length * attemps[0].length}
                                wordLength={attemps[0].length}
                            >
                                <p>{item.letter}</p>
                            </LetterContainer>
                        ))}
                    </div>
                ))}
            </GridContainer>
            <ScoreDialog
                action={{ label: 'Continuer', path: generateRoutePath(RoutePath.SECOND, {})}}
                close={{ label: 'Rejouer', action: restart }}
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

export default Motus

const Container = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    width: 100%;

    @media screen and (min-width: 820px) {
      display: none;
    }

    & > img {
        height: auto;
        height: 80px;
        left: calc(50% - 40px);
        position: absolute;
        top: -64px;
        width: 80px;
    }
`

const GridContainer = styled.div`
    align-items: center;
    border-radius: 16px;
    border-bottom: 5px solid #26293E;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media screen and (min-width: 820px) {
        display: none;
    }

    & > div {
        align-items: center;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
`

const LetterContainer = styled.div<{ index: number; isPerfect?: boolean; isCorrect?: boolean; totalIndex: number; totalLength: number; wordLength: number }>`
    align-items: center;
    background-color: #2e324d;
    border-bottom: solid 1px #555c88;
    border-left: ${({ index }) => index === 0 ? 'solid 1px #555c88' : 'none'};
    border-right: solid 1px #555c88;
    border-top: ${({ totalIndex, wordLength }) => totalIndex < wordLength ? 'solid 1px #555c88' : 'none'};
    border-radius: ${({ totalIndex, wordLength, totalLength }) => {
        if (totalIndex === 0) {
            return '16px 0 0 0';
        }

        if (totalIndex === wordLength - 1) {
            return '0 16px 0 0';
        }

        if (totalIndex === totalLength - 1) {
            return '0 0 16px 0';
        }

        if (totalIndex === totalLength - wordLength) {
            return '0 0 0 16px';
        }
    }};
    display: flex;
    flex-direction: row;
    justify-content: center;
    height: 40px;
    width: 40px;

    @media screen and (min-width: 820px) {
        display: none;
    }

    & > p {
        align-items: center;
        background-color: ${({ isPerfect, isCorrect }) => {
            if (isPerfect) return '#C55A5A'
            if (isCorrect) return '#E5B53A'

            return 'transparent'
        }};

        border-radius: ${({ isPerfect, isCorrect, totalIndex, wordLength, totalLength }) => {
            if (isPerfect) {
                if (totalIndex === 0) {
                    return '12px 0 0 0';
                }

                if (totalIndex === wordLength - 1) {
                    return '0 12px 0 0';
                }

                if (totalIndex === totalLength - 1) {
                    return '0 0 12px 0';
                }

                if (totalIndex === totalLength - wordLength) {
                    return '0 0 0 12px';
                }

                return 0
            }
            if (isCorrect) return '20px'

            return '0'
        }};
        color: #ffffff;
        font-size: 18px;
        font-weight: 700;
        display: flex;
        flex-direction: row;
        height: ${({ isPerfect }) => isPerfect ? 'calc(100% - 8px)' : '32px'};
        justify-content: center;
        padding: 4px;
        width: ${({ isPerfect }) => isPerfect ? 'calc(100% - 8px)' : '32px'};
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