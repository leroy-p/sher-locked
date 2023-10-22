import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { IRythmButton } from '../../data/rythm-config'

interface IProps {
    data: IRythmButton
    currentTimer: number
    action: () => void
    resetStreak: () => void
}

function Button({ data, currentTimer, action, resetStreak }: IProps) {
    const [pressed, setPressed] = useState<boolean>(false)
    const [missed, setMissed] = useState<boolean>(false)

    useEffect(() => {
        if (currentTimer > data.appearsAt + data.duration && !pressed) {
            setMissed(true)
            resetStreak()
        }
    }, [currentTimer])

    function onClick() {
        if (!pressed) {
            action()
        }
        setPressed(true)
    }

    return (
        <Container
            currentTimer={currentTimer}
            data={data}
            missed={missed}
            onTouchStart={onClick}
            pressed={pressed}
        />
    )
}

export default Button

const Container = styled.div<{ data: IRythmButton, currentTimer: number; pressed?: boolean; missed?: boolean  }>`
    align-items: center;
    background-color: ${({ data, pressed, missed }) => {
        if (pressed) return '#00ff00'

        // return missed ? '#ff0000' : data.color
        return data.color
    }};
    border-radius: ${({ data }) => `${data.radius / 2}px`};
    bottom: ${({ data }) => `${data.position.y}px`};
    display: flex;
    flex-direction: column;
    height: ${({ data }) => `${data.radius}px`};
    justify-content: center;
    left: ${({ data }) => `${data.position.x}px`};
    opacity: ${({ data, currentTimer }) => {
       if (currentTimer < data.appearsAt - 1 ||currentTimer > data.appearsAt + data.duration ) {
            return 0
        }

        if (currentTimer > data.appearsAt && currentTimer < data.appearsAt + data.duration) {
            return 1
        }

        return 0.3
    }};
    position: absolute;
    pointer-events: ${({ data, currentTimer }) =>
        currentTimer > data.appearsAt && currentTimer < data.appearsAt + data.duration ? 'auto' : 'none'};
    transform: ${({ data, currentTimer }) => {
        if (currentTimer < data.appearsAt - 1) {
            return data.isLeft ? 'translateX(140px)' : 'translateX(-140px)';
        }

        return 'translateY(0)'
    }};
    transition: transform 1s linear;
    width: ${({ data }) => `${data.radius}px`};
`
