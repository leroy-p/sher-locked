import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import Layout from '../layout/public'
import Dialog from '../components/dialog'
import { RoutePath, generateRoutePath } from '../app/router-config'

function Second() {
    const [secretWord, setSecretWord] = useState<string>('')
    const [error, setError] = useState<boolean>(false)
    const [submitCount, setSubmitCount] = useState<number>(0)
    const [showDialog, setShowDialog] = useState<boolean>(false)
    const [isPending, setIsPending] = useState<boolean>(false)

    useEffect(() => {
        setShowDialog(submitCount === 1)
    }, [submitCount])

    function submit() {
        if (isPending) return

        setIsPending(true)
        setError(false)

        setTimeout(() => {
            setError(secretWord.toLowerCase() !== 'sherlock')
            setSubmitCount((value) => value + 1)
            setIsPending(false)

            if (secretWord.toLowerCase() === 'sherlock') {
                window.location.href = generateRoutePath(RoutePath.THIRD, {})
            }
        }, 2700)
    }

    function closeDialog() {
        setShowDialog(false)
        setSubmitCount(0)
        setError(false)
    }

  return (
        <Layout>
            <>
                <Container>
                    <img src={isPending ? '/assets/image/raccoon-2.gif' : '/assets/image/raccoon-1.gif'} />
                    <p>Entre le deuxième mot secret</p>
                    <input onChange={(event) => setSecretWord(event.target.value.toUpperCase())} type="text" value={secretWord} />
                    <div />
                </Container>
                <ButtonContainer disabled={isPending} onClick={submit}>
                    Valider
                </ButtonContainer>
                <ErrorContainer>
                    {error && <p>Accès refusé.</p>}
                </ErrorContainer>
                <Dialog
                    action={{ label: 'Je participe', path: generateRoutePath(RoutePath.MOTUS, {})}}
                    close={{ label: 'Plus tard', action: closeDialog }}
                    title="Besoin d'un indice ?"
                    texts={["Participe à une épreuve pour obtenir des informations !"]}
                    visible={showDialog}
                />
                <DesktopContainer>
                    <img src="/assets/image/mobile.png" />
                    <p>Jeu disponible uniquement sur mobile.</p>
                </DesktopContainer>
            </>
    </Layout>
  )
}

export default Second

const Container = styled.div`
    align-items: center;
    background: #159999;
    border-radius: 32px 32px 0px 0px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 24px;
    padding: 24px;
    position: relative;
    width: 320px;

    @media screen and (min-width: 820px) {
        display: none;
    }

    & > img {
        height: auto;
        margin-top: -72px;
        width: 70%;
    }

    & > p {
        font-size: 19px;
        font-weight: 700;
        margin-bottom: 8px;
        text-align: center;
        width: 100%;
    }

    & > input {
        border: none;
        border-radius: 16px;
        background: #52C3C3;
        font-size: 20px;
        font-weight: 400;
        height: 56px;
        margin-top: 24px;
        width: 100%;
        text-align: center;
    }

    & > div {
        border-top: dashed 1px #107272;
        bottom: 32px;
        height: 1px;
        left: 90px;
        position: absolute;
        width: 120px;
    }

    & > button {
        background-color: #343434;
        height: 40px;
        padding: 0 16px;
        text-transform: uppercase;
    }
`

const ButtonContainer = styled.button<{ disabled?: boolean }>`
    align-items: center;
    background: #107272;
    border-radius: 0px 0px 24px 24px;
    border-right: 1px solid #0E5A5A;
    border-bottom: 5px solid #0E5A5A;
    border-left: 1px solid #0E5A5A;
    display: flex;
    flex-direction: column;
    font-size: 20px;
    font-weight: 700;
    height: 64px;
    justify-content: center;
    pointer-events: ${({ disabled }) => disabled ? 'none' : 'auto'};
    text-transform: uppercase;
    width: 320px;

    @media screen and (min-width: 820px) {
        display: none;
    }
`

const ErrorContainer = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 24px;
    margin-top: 8px;
    justify-content: center;
    width: 100%;

    @media screen and (min-width: 820px) {
        display: none;
    }

    & > p {
        color: #fa6666;
        font-size: 18px;
        font-weight: 700;
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