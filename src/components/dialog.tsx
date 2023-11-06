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
        <div>
            <div onClick={(event) => event.stopPropagation()}>
                <img src="/assets/image/raccoon-3.png" />
                <h6>{title}</h6>
                {texts.map((text, index) => <p key={index}>{text}</p>)}
            </div>
            <ButtonsContainer>
                <Link to={action.path}>
                    <button>{action.label}</button>
                </Link>
                <button onClick={close.action}>{close.label}</button>
            </ButtonsContainer>
        </div>
    </Container>
  )
}

export default Dialog

const Container = styled(Div100vh)<{ visible?: boolean }>`
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

    & > div {
        align-items: center;
        background-image: url('/assets/image/raccoon-pattern-blue.png');
        background-position: center;
        background-size: cover;
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: center;
        width: 100%;

        & > div:nth-child(1) {
            align-items: center;
            display: flex;
            flex-direction: column;
            height: calc(100% - 160px);
            justify-content: center;
            padding: 24px;
            width: calc(100% - 48px);

            & > img {
                width: 100px;
            }

            & > h6 {
                font-size: 24px;
                font-weight: 700;
                margin: 24px 0 8px 0;
                text-align: center;
            }

            & > p:nth-child(3) {
                font-size: 18px;
                font-style: normal;
                font-weight: 500;
                text-align: center;
            }

            & > p:nth-last-child(2) {
                margin-bottom: 24px;
            }

            & > p {
                text-align: left;
            }
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

    & > a > button {
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

    & > button {
        font-size: 20px;
        font-style: normal;
        font-weight: 800;
        text-transform: uppercase;
        width: 300px;
    }
`
