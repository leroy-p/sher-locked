interface IPosition {
    x: number
    y: number
}

export interface IRythmButton {
    color: string
    radius: number
    position: IPosition
    appearsAt: number
    duration: number
    isLeft?: boolean
}

interface IRythmConfig {
    ticRate: number
    itemScore: number,
    comboScore: number
    rythmButtons: IRythmButton[]
}

const delay = 1.8
const bpm = 0.6

const rythmButtons: IRythmButton[] = [
    {
        color: '#e8e09b',
        radius: 84,
        position: { x: window.innerWidth - 24 - 84, y: 8 },
        appearsAt: delay + 0 * bpm,
        duration: 0.25,
    },
    {
        color: '#fa6666',
        radius: 84,
        position: { x: window.innerWidth - 24 - 84, y: 108 },
        appearsAt: delay + 1 * bpm,
        duration: 0.25,
    },
    {
        color: '#e6b25e',
        radius: 84,
        position: { x: window.innerWidth - 24 - 84, y: 208 },
        appearsAt: delay + 2 * bpm,
        duration: 0.25,
    },
    {
        color: '#fa6666',
        radius: 84,
        position: { x: window.innerWidth - 24 - 84, y: 108 },
        appearsAt: delay + 3 * bpm,
        duration: 0.25,
    },
    {
        color: '#fa6666',
        radius: 84,
        position: { x: window.innerWidth - 24 - 84, y: 108 },
        appearsAt: delay + 5 * bpm + 0.4,
        duration: 0.25,
    },
    {
        color: '#e8e09b',
        radius: 84,
        position: { x: window.innerWidth - 24 - 84, y: 8 },
        appearsAt: delay + 6 * bpm,
        duration: 0.25,
    },
    {
        color: '#fa6666',
        radius: 84,
        position: { x: window.innerWidth - 24 - 84, y: 108 },
        appearsAt: delay + 8 * bpm,
        duration: 0.25,
    },
    {
        color: '#e8e09b',
        radius: 84,
        position: { x: window.innerWidth - 24 - 84, y: 8 },
        appearsAt: delay + 9 * bpm,
        duration: 0.25,
    },
    {
        color: '#5cb1ed',
        radius: 84,
        position: { x: window.innerWidth - 24 - 84, y: 308 },
        appearsAt: delay + 11 * bpm + 0.4,
        duration: 0.25,
    },
    {
        color: '#e6b25e',
        radius: 84,
        position: { x: window.innerWidth - 24 - 84, y: 208 },
        appearsAt: delay + 12 * bpm,
        duration: 0.25,
    },
    {
        color: '#fa6666',
        radius: 84,
        position: { x: window.innerWidth - 24 - 84, y: 108 },
        appearsAt: delay + 13 * bpm,
        duration: 0.25,
    },
    {
        color: '#e8e09b',
        radius: 84,
        position: { x: window.innerWidth - 24 - 84, y: 8 },
        appearsAt: delay + 14 * bpm,
        duration: 0.25,
    },
    {
        color: '#fa6666',
        radius: 84,
        position: { x: window.innerWidth - 24 - 84, y: 108 },
        appearsAt: delay + 15 * bpm,
        duration: 0.25,
    },
    {
        color: '#e6b25e',
        radius: 84,
        position: { x: window.innerWidth - 24 - 84, y: 208 },
        appearsAt: delay + 16 * bpm + 0.4,
        duration: 0.25,
    },
    {
        color: '#fa6666',
        radius: 84,
        position: { x: window.innerWidth - 24 - 84, y: 108 },
        appearsAt: delay + 17 * bpm + 0.4,
        duration: 0.25,
    },
    {
        color: '#e8e09b',
        radius: 84,
        position: { x: window.innerWidth - 24 - 84, y: 8 },
        appearsAt: delay + 18 * bpm,
        duration: 0.25,
    },
    {
        color: '#fa6666',
        radius: 84,
        position: { x: window.innerWidth - 24 - 84, y: 108 },
        appearsAt: delay + 20 * bpm,
        duration: 0.25,
    },
    {
        color: '#e8e09b',
        radius: 84,
        position: { x: window.innerWidth - 24 - 84, y: 8 },
        appearsAt: delay + 20 * bpm + 0.4,
        duration: 0.25,
    },
    {
        color: '#fa6666',
        radius: 84,
        position: { x: window.innerWidth - 24 - 84, y: 108 },
        appearsAt: delay + 21 * bpm,
        duration: 0.25,
    },
]

for (let i = 0; i < 22; i++) {
    rythmButtons.push(
        {
            color: i % 3 === 0 ? '#e8e09b' : '#fa6666',
            radius: 84,
            position: { x: 24, y: i % 3 === 0 ? 8 : 108 },
            appearsAt: delay + i * bpm,
            duration: 0.25,
            isLeft: true,
        }
    )
}


export const rythmConfig: IRythmConfig = {
    ticRate: 10,
    itemScore: 100,
    comboScore: 10,
    rythmButtons,
}