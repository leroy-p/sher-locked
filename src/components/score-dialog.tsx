import React from 'react'
import styled from 'styled-components'
import Div100vh from 'react-div-100vh'
import { Link } from 'react-router-dom'

interface IProps {
    title: string
    visible: boolean
    close: { label: string; action: () => void }
    action: { label: string; path: string }
    score: number
    personalBest: number
}

function ScoreDialog({ title, visible, close, action, score, personalBest }: IProps) {
  return (
    <Container visible={visible}>
        <div onClick={(event) => event.stopPropagation()}>
            <h6>{title}</h6>
            <h4>{score}</h4>
            <div />
            <p>Record</p>
            <h5>{personalBest}</h5>
        </div>
        <ButtonsContainer>
            <button onClick={close.action}>{close.label}</button>
            <Link to={action.path}>
                <button>{action.label}</button>
            </Link>
        </ButtonsContainer>
    </Container>
  )
}

export default ScoreDialog

const Container = styled(Div100vh)<{ visible?: boolean }>`
    align-items: center;
    background: linear-gradient(180deg, rgba(132, 138, 187, 0.30) 0%, rgba(0, 0, 0, 0.21) 100%), #3E4366;
    background-position: center;
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

    & > div:nth-child(1) {
        align-items: center;
        background-image: url('/assets/image/background-score.png');
        background-position: center;
        background-size: 100% auto;
        display: flex;
        flex-direction: column;
        height: calc(100% - 160px);
        justify-content: center;
        padding: 48px 24px;
        width: calc(100% - 48px);

        & > h6 {
            font-size: 32px;
            font-weight: 700;
            text-align: center;
            text-transform: uppercase;
        }

        & > h5 {
            font-size: 40px;
            font-weight: 700;
            text-align: center;
            text-transform: uppercase;
        }

        & > h4 {
            font-size: 64px;
            font-weight: 700;
            text-align: center;
            text-transform: uppercase;
        }

        & > p {
            font-size: 24px;
            font-style: normal;
            font-weight: 700;
            text-align: center;
            text-transform: uppercase;
        }

        & > div {
            background: #FFF;
            border-radius: 32px;
            height: 6px;
            margin: 48px 0;
            width: 56px;
        }
    }
`

const ButtonsContainer = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 24px;
    justify-content: center;
    height: 160px;
    padding-bottom: 48px;
    width: 100%;

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

    & > a > button {
        font-size: 20px;
        font-style: normal;
        font-weight: 800;
        text-transform: uppercase;
        width: 300px;
    }
`
