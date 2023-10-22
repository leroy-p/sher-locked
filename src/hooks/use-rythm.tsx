import { useEffect, useState } from "react"
import { rythmConfig } from "../data/rythm-config"

export function useRythm() {
    const [started, setStarted] = useState<boolean>(false)
    const [countdown, setCountDown] = useState<number>(3)
    const [countdownInterval, setCountdownInverval] = useState<ReturnType<typeof setInterval> | null>(null)
    const [currentTimer, setCurrentTimer] = useState<number>(0)
    const [timerInterval, setTimerInverval] = useState<ReturnType<typeof setInterval> | null>(null)
    const [score, setScore] = useState<number>(0)
    const [personalBest, setPersonalBest] = useState<number>(0)
    const [streak, setStreak] = useState<number>(0)
    const [tryCount, setTryCount] = useState<number>(0)
    const [showDialog, setShowDialog] = useState<boolean>(false)

    useEffect(() => {
        const personalBestItem = localStorage.getItem('rythm-personal-best')
        const personalBestMumber = personalBestItem ? parseInt(personalBestItem) : undefined

        setPersonalBest(personalBestMumber || 0)

        setTimeout(() => {
            const musicPlayer = window.document.querySelector('#music-player') as HTMLAudioElement

            musicPlayer.load()
        }, 500)
    }, [])

    useEffect(() => {
        if (countdown === 0 && countdownInterval) {
            clearInterval(countdownInterval)
            setCountdownInverval(null)
        }
    }, [countdown])

    function start() {
        if (!timerInterval && !started) {
            setTimerInverval(setInterval(() => setCurrentTimer((value) => value + rythmConfig.ticRate), rythmConfig.ticRate))
        }

        if (countdownInterval) {
            clearInterval(countdownInterval)
        }
        setCountdownInverval(
            setInterval(() => {
                setCountDown((value) => value - 1)
            }, 750
        ))

        setTryCount((value) => value + 1)
        setCurrentTimer(0)
        setScore(0)

        setTimeout(() => {
            const musicPlayer = window.document.querySelector('#music-player') as HTMLAudioElement

            musicPlayer.play()
        }, 1450)

        setStarted(true)
    }

    function incrementScore() {
        setScore((value) => value + (streak * rythmConfig.comboScore + rythmConfig.itemScore))
        setStreak((value) => value + 1)
    }

    function resetStreak() {
        setStreak(0)
    }

    function end() {
        setPersonalBest(score > personalBest ? score : personalBest)

        if (score > personalBest) {
            localStorage.setItem('rythm-personal-best', score.toString())
        }

        if (timerInterval) {
            clearInterval(timerInterval)
        }

        setCountDown(3)
        setShowDialog(true)
        setTimerInverval(null)
        setStarted(false)
    }

    return {
        countdown,
        started,
        currentTimer: currentTimer / 1000,
        score,
        personalBest,
        tryCount,
        streak,
        showDialog,
        start,
        incrementScore,
        resetStreak,
        end,
        setShowDialog,
    }
}