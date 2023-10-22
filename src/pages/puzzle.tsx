import React from 'react'
import styled from 'styled-components'

import { usePuzzle } from '../hooks/use-puzzle'
import { RoutePath, generateRoutePath } from '../app/router-config'
import Layout from '../components/puzzle/layout'
import Dialog from '../components/dialog'

interface IProps {}

function Puzzle(props: IProps) {
    const {
        cells,
        showDialog,
        moveCount,
        moveCell,
        restart,
    } = usePuzzle()

    return (
      <Layout>
          <Container>
              <img src="/assets/image/raccoon.png" />
              <BoardContainer>
                {cells.map((row, rowIndex) => (
                    row.map((cell, cellIndex) => (
                        <CellContainer
                            isEmpty={cell === 0}
                            index={rowIndex * 4 + cellIndex}
                            key={rowIndex * 4 + cellIndex}
                            onClick={() => moveCell(rowIndex, cellIndex)}
                            value={cell}
                        />
                    ))
                ))}
              </BoardContainer>
              <Dialog
                action={{ label: 'Quitter', path: generateRoutePath(RoutePath.CITY, {})}}
                close={{ label: 'Rejouer', action: restart }}
                title="Partie terminée"
                texts={[`Nombre de coups : ${moveCount}`, `Record personnel : ${moveCount}`]}
                visible={showDialog}
            />
          </Container>
      </Layout>
  )
}

export default Puzzle

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 48px;
  justify-content: center;
  position: relative;
  padding: 48px 0;
  width: 100%;

  & > img {
    height: auto;
    width: 30%;
  }
`

const BoardContainer = styled.div`
    align-items: center;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    height: 400px;
    justify-content: center;
    padding: 0 24px;
    width: 100%;
`

const CellContainer = styled.div<{ index: number; isEmpty?: boolean; value: number }>`
    align-items: center;
    background-image: ${({ isEmpty }) => isEmpty ? 'none' : "url('/assets/image/london.png')"};
    background-size: 400% 400%;
    background-color: #343434;
    background-position: ${({ value }) => {
        const x = (value - 1) % 4
        const y = Math.floor((value - 1) / 4)

        console.log(`x: ${x}, y: ${y}`)

        return `-${100 * x}% -${100 * y}%`
    }};
    border-bottom: solid 1px #ffffff;
    border-left: ${({ index }) => index % 4 === 0 ? 'solid 1px #ffffff' : 'none'};
    border-right: solid 1px #ffffff;
    border-top: ${({ index }) => index < 4 ? 'solid 1px #ffffff' : 'none'};
    display: flex;
    flex-direction: row;
    height: 25%;
    justify-content: center;
    width: 25%;
`