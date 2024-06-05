import { useEffect, useState } from "react"
import * as S from './style'

type BoardObject = {
  selected: boolean,
  highlighter: 'X' | 'O' | undefined
}


function generateBoardPositions(positions: number) {
  
  const array = []
  for(let i = 0; i < positions; i++) {
    array.push(    {
      selected: false,
      highlighter: ""
    },)
  }

  return array;
}

export const Board = () => {

  const [turn, setTurn] = useState<"X" | "O">("X")



  const [positions, setPositions] = useState([
    generateBoardPositions(3),
    generateBoardPositions(3),
    generateBoardPositions(3)
  ])

  useEffect(() => {
    console.log(positions)
  }, [positions])

  const handleSelectSquare = (rowPosition, columnPosition) => {
    const board = positions;

    board[rowPosition][columnPosition] = {
      selected: true,
      highlighter: turn
    }

    setPositions([...board])
    setTurn(prev => prev === "X" ? "O" : "X")
  }

  const checkVictory = () => {
    throw Error('Not implemented')
  }

  const checkATie = () => {
    throw Error('Not implemented')
  }

  return (
    <S.BoardContainer>
      {
        positions.map((row, rowPosition) => 
          <S.BoardRow key={rowPosition}>
            {
            row.map((position, columPosition) => {
              return <S.Square onClick={() => handleSelectSquare(rowPosition, columPosition)} key={columPosition}>{position.selected ? position.highlighter : null}</S.Square>
            })
          }
          </S.BoardRow>
        )
      }
    </S.BoardContainer>
  )
}