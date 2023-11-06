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

    console.log('foundLetters', foundLetters)
    console.log('highlightedLetters', highlightedLetters)

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
                        large={entry === 'del' || entry === 'entry'}
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
    background: linear-gradient(180deg, rgba(132, 138, 187, 0.30) 0%, rgba(0, 0, 0, 0.21) 100%), #3E4366;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 24px;
    position: relative;
    width: 100vw;
`

const MainContainer = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    height: calc(100% - 142px);
    justify-content: center;
    overflow: hidden;
    position: relative;
    width: 100%;

    @media screen and (min-width: 820px) {
      height: 100%;
    }
`

const KeyBoardContainer = styled.div`
    align-items: center;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 2px;
    height: 142px;
    justify-content: center;
    position: relative;
    width: 340px;

    @media screen and (min-width: 820px) {
      display: none;
    }
`

const KeyboardButton = styled.button<{ index: number; text?: boolean; highlighted?: boolean; large?: boolean }>`
    align-items: center;
    background-color: ${({ highlighted }) => highlighted ? '#fa6666' : '#555C88'};
    border-radius: 6px;
    border-top: 1px solid #2E324D;
    border-right: 1px solid #2E324D;
    border-bottom: 4px solid #2E324D;
    border-left: 1px solid #2E324D;
    color: #ffffff;
    display: flex;
    flex-direction: row;
    flex-shrink: 0;
    font-size: ${({ text }) => text ? '12px' : '24px'};
    height: 46px;
    justify-content: center;
    margin: 1px 0;
    padding: 4px;
    width: ${({ large }) => large ? '66px' : '32px'};
`

const SuccessContainer = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 142px;
    justify-content: flex-end;
    gap: 16px;
    position: relative;
    width: 100%;

    & > h6 {
        font-size: 24px;
    }

    & > button {
        border-radius: 24px;
        border-right: 1px solid rgba(255, 255, 255, 0.50);
        border-bottom: 5px solid rgba(255, 255, 255, 0.50);
        border-left: 1px solid rgba(255, 255, 255, 0.50);
        background: rgba(255, 255, 255, 0.10);
        font-size: 20px;
        font-style: normal;
        font-weight: 800;
        height: 64px;
        text-transform: uppercase;
        width: 300px;
  }
`