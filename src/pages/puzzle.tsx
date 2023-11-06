import React from 'react'
import styled from 'styled-components'

import { usePuzzle } from '../hooks/use-puzzle'
import { RoutePath, generateRoutePath } from '../app/router-config'
import Layout from '../components/puzzle/layout'
import ScoreDialog from '../components/score-dialog'

interface IProps {}

function Puzzle(props: IProps) {
    const {
        cells,
        showDialog,
        moveCount,
        personalBest,
        moveCell,
        restart,
    } = usePuzzle()

    return (
      <Layout>
        <>
          <Container>
              <BoardContainer>
                <img src="/assets/image/raccoon-5.png" />
                {cells.map((row, rowIndex) => (
                    row.map((cell, cellIndex) => (
                        <CellContainer
                            isEmpty={cell === 0}
                            index={rowIndex * 4 + cellIndex}
                            key={rowIndex * 4 + cellIndex}
                            onClick={() => moveCell(rowIndex, cellIndex)}
                            value={cell}
                        >
                          <div />
                        </CellContainer>
                    ))
                ))}
              </BoardContainer>
              <ScoreDialog
                action={{ label: 'Continuer', path: generateRoutePath(RoutePath.PUZZLE, {})}}
                close={{ label: 'Rejouer', action: restart }}
                personalBest={personalBest}
                score={moveCount}
                title="Coups"
                visible={showDialog}
            />
          </Container>
          <DesktopContainer>
                  <img src="/assets/image/mobile.png" />
                  <p>Jeu disponible uniquement sur mobile.</p>
            </DesktopContainer>
            </>
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

  @media screen and (min-width: 820px) {
      display: none;
  }
`

const BoardContainer = styled.div`
    align-items: center;
    border-radius: 16px;
    border-bottom: 5px solid #26293E;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    height: 400px;
    justify-content: center;
    position: relative;
    width: calc(100% - 48px);

    @media screen and (min-width: 820px) {
      display: none;
    }

    & > img {
        height: auto;
        height: 80px;
        left: calc(50% - 40px);
        position: absolute;
        top: -64px;
        width: 80px;
    }
`

const CellContainer = styled.div<{ index: number; isEmpty?: boolean; value: number }>`
    align-items: center;
    background-image: ${({ isEmpty }) => isEmpty ? 'none' : "url('/assets/image/buckingham.png')"};
    background-size: 400% 400%;
    background-color: #222639;
    background-position: ${({ value }) => {
        const x = (value - 1) % 4
        const y = Math.floor((value - 1) / 4)

        console.log(`x: ${x}, y: ${y}`)

        return `-${100 * x}% -${100 * y}%`
    }};
    border-bottom: solid 1px #555c88;
    border-left: ${({ index }) => index % 4 === 0 ? 'solid 1px #555c88' : 'none'};
    border-right: solid 1px #555c88;
    border-top: ${({ index }) => index < 4 ? 'solid 1px #555c88' : 'none'};
    border-radius: ${({ index }) => {
        if (index === 0) {
            return '16px 0 0 0';
        }

        if (index === 3) {
            return '0 16px 0 0';
        }

        if (index === 12) {
            return '0 0 0 16px';
        }

        if (index === 15) {
            return '0 0 16px 0';
        }
    }};
    display: flex;
    flex-direction: row;
    height: 25%;
    justify-content: center;
    padding: 3px;
    width: 25%;

    @media screen and (min-width: 820px) {
      display: none;
    }

    & > div {
      background-color: ${({ isEmpty }) => isEmpty ? '#3E4366' : "transparent"};
      border-radius: ${({ index }) => {
        if (index === 0) {
            return '13px 0 0 0';
        }

        if (index === 3) {
            return '0 13px 0 0';
        }

        if (index === 12) {
            return '0 0 0 13px';
        }

        if (index === 15) {
            return '0 0 13px 0';
        }
      }};
      box-shadow: ${({ isEmpty }) => isEmpty ? '0px 0px 32px 0px rgba(0, 0, 0, 0.45) inset' : 'none'};
      height: 100%;
      width: 100%;
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