import React from 'react'
import styled from 'styled-components'
import Div100vh from 'react-div-100vh'
import { Link } from 'react-router-dom'

interface IProps {
    title: string
    texts: string[]
    visible: boolean
    close: { label: string; action: () => void }
    action: { label: string; path: string }
}

function Dialog({ title, texts, visible, close, action }: IProps) {
  return (
    <Container visible={visible}>
        <div onClick={(event) => event.stopPropagation()}>
            <h6>{title}</h6>
            {texts.map((text, index) => <p key={index}>{text}</p>)}
          <ButtonsContainer>
            <button onClick={close.action}>{close.label}</button>
            <Link to={action.path}>
                <button>{action.label}</button>
            </Link>
          </ButtonsContainer>
        </div>
    </Container>
  )
}

export default Dialog

const Container = styled(Div100vh)<{ visible?: boolean }>`
    align-items: center;
    background-color: #000000aa;
    display: flex;
    flex-direction: column;
    justify-content: center;
    left: 0;
    opacity: ${({ visible }) => visible ? '1' : '0'};
    pointer-events: ${({ visible }) => visible ? 'auto' : 'none'};
    position: fixed;
    transition: opacity 200ms ease-in-out;
    top: 0;
    width: 100vw;
    z-index: 10;

    & > div {
        align-items: center;
        background-color: #343434;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 24px;
        width: calc(100% - 48px);

        & > h6 {
            font-size: 24px;
            font-weight: bold;
            text-align: center;
        }

        & > p:nth-child(2) {
            margin-top: 24px;
        }

        & > p:nth-last-child(2) {
            margin-bottom: 24px;
        }

        & > p {
            text-align: left;
        }
    }
`

const ButtonsContainer = styled.div`
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;

    & > button {
        background-color: #000000;
        height: 40px;
        padding: 0 16px;
        text-transform: uppercase;
        width: 140px;
    }

    & > a {
        text-decoration: none;

        & > button {
            background-color: #000000;
            height: 40px;
            padding: 0 16px;
            text-transform: uppercase;
            width: 140px;
        }
    }
`
