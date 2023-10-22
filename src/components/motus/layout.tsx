import React  from 'react'
import styled from 'styled-components'
import Div100vh from 'react-div-100vh'

interface IProps {
    children: JSX.Element
    foundLetters: string[]
    success?: boolean
    failure?: boolean
    addLetter: (input: string) => void
    removeLetter: () => void
    submitAttempt: () => void
    next: () => void
}

function Layout({ children, foundLetters, success, failure, addLetter, submitAttempt, removeLetter, next }: IProps) {
    const keyboardEntries = [
        'a', 'z', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p',
        'q', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm',
        'w', 'x', 'c', 'v', 'b', 'n', 'del', 'entry'
    ]

    function onClick(letter: string) {
        if (letter === 'entry') {
            submitAttempt()
        } else if (letter === 'del') {
            removeLetter()
        } else {
            addLetter(letter.toUpperCase())
        }
    }

    const highlightedLetters = [...foundLetters]
    highlightedLetters.shift()

    return (
      <Container>
        <MainContainer>
            {children}
        </MainContainer>
        {!success && !failure && (
            <KeyBoardContainer>
                {keyboardEntries.map((entry, index) => (
                    <KeyboardButton
                        highlighted={highlightedLetters.includes(entry.toUpperCase())}
                        index={index}
                        key={index}
                        text={entry.length > 1}
                        onClick={() => onClick(entry)}
                    >
                        {entry.toUpperCase()}
                    </KeyboardButton>
                ))}
            </KeyBoardContainer>
        )}
        {success && (
            <SuccessContainer>
                <h6>C'est bien ça !</h6>
                <button onClick={next}>Suivant</button>
            </SuccessContainer>
        )}
        {failure && (
            <SuccessContainer>
                <h6>Dommage !</h6>
                <button onClick={next}>Suivant</button>
            </SuccessContainer>
        )}
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
  max-width: 600px;
  width: 100vw;
`

const MainContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: calc(100% - 40vw);
  justify-content: flex-start;
  padding-top: 48px;
  position: relative;
  width: 100%;
`

const KeyBoardContainer = styled.div`
    align-items: center;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    height: 40vw;
    max-height: 200px;
    justify-content: center;
    position: relative;
    padding: 24px;
    width: 100%;
`

const KeyboardButton = styled.button<{ index: number; text?: boolean; highlighted?: boolean }>`
    align-items: center;
    background-color: ${({ highlighted }) => highlighted ? '#fa6666' : '#343434'};
    border-bottom: solid 1px #ffffff;
    border-left: ${({ index }) => index === 0 || index === 10 || index === 20 ? 'solid 1px #ffffff' : 'none'};
    border-right: solid 1px #ffffff;
    border-top: ${({ index }) => index < 10 ? 'solid 1px #ffffff' : 'none'};
    color: #ffffff;
    display: flex;
    flex-direction: row;
    flex-shrink: 0;
    font-size: ${({ text }) => text ? '12px' : '24px'};
    height: calc((100vw - 48px) / 10);
    max-height: 52px;
    justify-content: center;
    min-width: 10%;
    padding: 4px;
`

const SuccessContainer = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 40vw;
    justify-content: flex-end;
    gap: 16px;
    position: relative;
    padding: 24px;
    width: 100%;

    & > h6 {
        font-size: 24px;
    }

    & > button {
        background-color: #343434;
        height: 40px;
        padding: 0 16px;
        text-transform: uppercase;
  }
`