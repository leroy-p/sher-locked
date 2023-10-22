import { useEffect, useState } from "react"

export function usePuzzle() {
    const [cells, setCells] = useState<number[][]>([
        [7, 12, 6, 14],
        [2, 11, 1, 9],
        [15, 5, 10, 3],
        [4, 8, 13, 0],
    ])
    // const [cells, setCells] = useState<number[][]>([
    //     [0, 2, 3, 4],
    //     [1, 6, 7, 8],
    //     [5, 10, 11, 12],
    //     [9, 13, 14, 15],
    // ])
    const [moveCount, setMoveCount] = useState<number>(0)
    const [personalBest, setPersonalBest] = useState<number>(-1)
    const [showDialog, setShowDialog] = useState<boolean>(false)
    const [disabled, setDisabled] = useState<boolean>(false)

    useEffect(() => {
        let index = 1
        let success = true

        const personalBestItem = localStorage.getItem('motus-personal-best')
        const personalBestMumber = personalBestItem ? parseInt(personalBestItem) : undefined

        setPersonalBest(personalBestMumber || 0)

        for (let i = 0; i < cells.length; i++) {
            for (let j= 0; j < cells[i].length; j++) {
                if (cells[i][j] !== index % (4 * 4)) {
                    success = false

                    break
                }

                index += 1
            }
        }

        setPersonalBest(success && (personalBest === -1 || moveCount < personalBest) ? moveCount : personalBest)
        setDisabled(success)

        if (success && (personalBest === -1 || moveCount < personalBest)) {
            localStorage.setItem('motus-personal-best', moveCount.toString())
        }


        if (success) {
            setTimeout(() => setShowDialog(true), 1000)
        }
    }, [cells])

    function moveCell(x: number, y: number) {
        const tmp = [...cells]
        const result = [...cells]
        let move = false

        if (disabled || !tmp[x][y]) return

        if (x > 0 && !tmp[x - 1][y]) {
            const value = tmp[x][y]

            result[x - 1][y] = value
            result[x][y] = 0
            move = true
        } else if (x < 3 && !tmp[x + 1][y]) {
            const value = tmp[x][y]

            result[x + 1][y] = value
            result[x][y] = 0
            move = true
        } else if (y > 0 && !tmp[x][y - 1]) {
            const value = tmp[x][y]

            result[x][y - 1] = value
            result[x][y] = 0
            move = true
        } else if (y < 3 && !tmp[x][y + 1]) {
            const value = tmp[x][y]

            result[x][y + 1] = value
            result[x][y] = 0
            move = true
        }

        setCells(result)
        setMoveCount((value) => move ? value + 1 : value)
    }

    function restart() {
        setCells([
            [7, 12, 6, 14],
            [2, 11, 1, 9],
            [15, 5, 10, 3],
            [4, 8, 13, 0],
        ])
        setMoveCount(0)
        setShowDialog(false)
        setDisabled(false)
    }

    return { cells, showDialog, moveCount, moveCell, restart }
}