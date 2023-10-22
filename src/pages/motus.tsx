import React from 'react'
import styled from 'styled-components'
import Layout from '../components/motus/layout'
import { useMotus } from '../hooks/use-motus'
import Dialog from '../components/dialog'
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
          <Container>
            <img src="/assets/image/raccoon.png" />
            {attemps.map((attempt, attempIndex) => (
                <div key={attempIndex}>
                    {attempIndex > results.length - 1 && attempt.map((letter, letterIndex) => (
                        <LetterContainer index={letterIndex} key={letterIndex}>
                            <p>{letter}</p>
                        </LetterContainer>
                    ))}
                    {attempIndex < results.length && results[attempIndex].map((item, itemIndex) => (
                        <LetterContainer index={itemIndex} isPerfect={item.isPerfect} isCorrect={item.isCorrect} key={itemIndex}>
                            <p>{item.letter}</p>
                        </LetterContainer>
                    ))}
                </div>
            ))}
            <Dialog
                action={{ label: 'Quitter', path: generateRoutePath(RoutePath.PASSWORD, {})}}
                close={{ label: 'Rejouer', action: restart }}
                title="Partie terminée"
                texts={[`Score : ${score}`, `Record personnel : ${personalBest}`]}
                visible={showDialog}
            />
          </Container>
      </Layout>
  )
}

export default Motus

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: flex-start;
  position: relative;
  width: 100%;

  & > img {
    height: auto;
    margin-bottom: 48px;
    width: 30%;
  }

  & > div {
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
`

const LetterContainer = styled.div<{ index: number; isPerfect?: boolean; isCorrect?: boolean }>`
    align-items: center;
    background-color: ${({ isPerfect }) => isPerfect ? '#fa6666' : '#343434'};
    border-bottom: solid 1px #ffffff;
    border-left: ${({ index }) => index === 0 ? 'solid 1px #ffffff' : 'none'};
    border-right: solid 1px #ffffff;
    border-top: solid 1px #ffffff;
    display: flex;
    flex-direction: row;
    justify-content: center;
    height: 40px;
    width: 40px;

    & > p {
        align-items: center;
        background-color: ${({ isPerfect, isCorrect }) => isCorrect && !isPerfect ? '#e8e09b' : 'transparent'};
        border-radius: 20px;
        color: #ffffff;
        font-size: 32px;
        display: flex;
        flex-direction: row;
        height: 32px;
        justify-content: center;
        padding: 4px;
        width: 32px;
    }
`