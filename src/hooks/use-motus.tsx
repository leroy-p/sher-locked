import { useEffect, useState } from "react"

import { arrayToString, shuffleArray, stringToArray } from "../utils"
import { motusAllowedWords, wordsToFind } from "../data/motus-words"

export function useMotus() {
    const [wordsList, setWordsList] = useState<string[]>([])
    const [wordToFindIndex, setWordToFindIndex] = useState<number>(-1)
    const [wordToFind, setWordToFind] = useState<string[]>([])
    const [attemps, setAttemps] = useState<string[][]>([])
    const [currentAttemptIndex, setCurrentAttemptIndex] = useState<number>(0)
    const [positionIndex, setPositionIndex] = useState<number>(1)
    const [results, setResults] = useState<{ letter: string; isPerfect: boolean; isCorrect: boolean }[][]>([])
    const [foundLetters, setFoundLetters] = useState<string[]>([])
    const [score, setScore] = useState<number>(0)
    const [personalBest, setPersonalBest] = useState<number>(0)
    const [success, setSuccess] = useState<boolean>(false)
    const [failure, setFailure] = useState<boolean>(false)
    const [showDialog, setShowDialog] = useState<boolean>(false)

    useEffect(() => {
        const personalBestItem = localStorage.getItem('motus-personal-best')
        const personalBestMumber = personalBestItem ? parseInt(personalBestItem) : undefined

        setPersonalBest(personalBestMumber || 0)
        setWordsList(shuffleArray(wordsToFind))
        setWordToFindIndex(0)
    }, [])

    useEffect(() => {
        if (wordToFindIndex === -1) return

        const initialWord = stringToArray(wordsList[wordToFindIndex].toUpperCase())
        const initialAttemps = new Array(6).fill(new Array(wordsList[wordToFindIndex].length).fill(' '))

        setWordToFind([...initialWord])

        for (let i = 1; i < initialWord.length; i++) {
            initialWord[i] = '.'
        }

        initialAttemps[0] = initialWord

        setSuccess(false)
        setFailure(false)
        setResults([])
        setCurrentAttemptIndex(0)
        setPositionIndex(1)
        setAttemps([...initialAttemps])
        setFoundLetters([...initialWord])
    }, [wordToFindIndex])

    useEffect(() => {
        if (currentAttemptIndex === 0) return

        setSuccess(!foundLetters.includes('.'))
        setFailure(foundLetters.includes('.') && currentAttemptIndex > attemps.length - 1)
        setScore((value) => !foundLetters.includes('.') ? value + 7 - results.length : value)

        if (!foundLetters.includes('.') || (foundLetters.includes('.') && currentAttemptIndex > attemps.length - 1)) return

        const newAttempts = [...attemps]

        newAttempts[currentAttemptIndex] = [...foundLetters]

        setAttemps(newAttempts)
    }, [currentAttemptIndex])

    function addLetter(input: string) {
        const newAttempts = [...attemps]

        if (positionIndex === wordsList[wordToFindIndex].length) return

        newAttempts[currentAttemptIndex][positionIndex] = input

        setPositionIndex((value) => Math.min(value + 1, wordsList[wordToFindIndex].length))
        setAttemps(newAttempts)
    }

    function removeLetter() {
        const newAttempts = [...attemps]

        if (positionIndex === 1) return

        newAttempts[currentAttemptIndex][positionIndex - 1] = '.'

        setPositionIndex((value) => Math.max(value - 1, 1))
        setAttemps(newAttempts)
    }


    function submitAttempt() {
        const objective = wordToFind.map((letter) => ({ letter, isUsed: false }))
        const result: { letter: string; isPerfect: boolean; isCorrect: boolean }[] = []
        const newFoundLetters = [...foundLetters]

        if (attemps[currentAttemptIndex].includes('.') || !motusAllowedWords.includes(arrayToString(attemps[currentAttemptIndex]))) {
            return
        }

        for (let i = 0; i < attemps[currentAttemptIndex].length; i++) {
            const isPerfect = wordToFind[i] === attemps[currentAttemptIndex][i]
            const isCorrect = Boolean(objective.find((item) => {
                if (item.letter === attemps[currentAttemptIndex][i] && !item.isUsed) {
                    item.isUsed = true

                    return true
                }

                return false
            }))

            if (isPerfect) {
                newFoundLetters[i] = attemps[currentAttemptIndex][i]

                for (let j = 0; j < i; j++) {
                    if (result[j].letter === attemps[currentAttemptIndex][i] && result[j].isCorrect) {
                        result[j].isCorrect = false

                        break
                    }
                }
            }

            result.push({ letter: attemps[currentAttemptIndex][i], isPerfect, isCorrect })
        }

        setFoundLetters(newFoundLetters)
        setResults([...results, result])
        setCurrentAttemptIndex((value) => value + 1)
        setPositionIndex(1)
    }

    function next() {
        setPersonalBest(score > personalBest ? score : personalBest)

        if (score > personalBest) {
            localStorage.setItem('motus-personal-best', score.toString())
        }

        setWordToFindIndex((value) => wordToFindIndex < wordsToFind.length - 1 ? value + 1 : value)
        setShowDialog(wordToFindIndex === wordsToFind.length - 1)
    }

    function restart() {
        setWordToFindIndex(0)
        setShowDialog(false)
    }

    return {
        currentAttemptIndex,
        wordToFind,
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
        setShowDialog,
    }
}
