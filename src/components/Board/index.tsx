import { useEffect, useState } from "react"
import * as S from './style'
import Confetti from 'react-confetti'


type BoardObject = {
  selected: boolean,
  highlighter: 'X' | 'O' | undefined
}
type Board = Array<BoardObject[]>

function generateBoardPositions(positions: number) {
  
  const array = []
  for(let i = 0; i < positions; i++) {
    array.push({
      selected: false,
      highlighter: undefined,
    },)
  }

  return array;
}

export const Board = () => {
  const [turn, setTurn] = useState<"X" | "O">("X")
  const [winner, setWinner] = useState<string | undefined>(undefined)
  const [draw, setDraw] = useState(false)

  const checkWin = (board: Board): 'X' | 'O' | undefined => {
    const size = 3;
  
    for (let i = 0; i < size; i++) {
      if (
        board[i][0].highlighter &&
        board[i][0].highlighter === board[i][1].highlighter &&
        board[i][0].highlighter === board[i][2].highlighter
      ) {
        return board[i][0].highlighter;
      }
    }
  
    for (let j = 0; j < size; j++) {
      if (
        board[0][j].highlighter &&
        board[0][j].highlighter === board[1][j].highlighter &&
        board[0][j].highlighter === board[2][j].highlighter
      ) {
        return board[0][j].highlighter;
      }
    }
  
    if (
      board[0][0].highlighter &&
      board[0][0].highlighter === board[1][1].highlighter &&
      board[0][0].highlighter === board[2][2].highlighter
    ) {
      return board[0][0].highlighter;
    }
  
    if (
      board[0][2].highlighter &&
      board[0][2].highlighter === board[1][1].highlighter &&
      board[0][2].highlighter === board[2][0].highlighter
    ) {
      return board[0][2].highlighter;
    }
  
    return undefined;
  };

  const INITIAL_BOARD_OBJ = [
    generateBoardPositions(3),
    generateBoardPositions(3),
    generateBoardPositions(3)
  ]
  
  const [positions, setPositions] = useState<Board>(INITIAL_BOARD_OBJ)

  useEffect(() => {
    const winner = checkWin(positions)
    if(winner) {
      setWinner(winner)
      return
    }
    if(checkDraw(positions)) setDraw(true)
  }, [positions])

  const handleSelectSquare = (rowPosition: number, columnPosition: number) => {
    const board = positions;

    board[rowPosition][columnPosition] = {
      selected: true,
      highlighter: turn
    }

    setPositions([...board])
    setTurn(prev => prev === "X" ? "O" : "X")
  }

  const checkDraw = (board: Board) => {
    for (const row of board) {
      for (const cell of row) {
        if (!cell.selected) {
          return false; // Se encontrar uma célula não selecionada, não é empate
        }
      }
    }
    return true; // Todas as células estão selecionadas, é empate
  };

  const handleNewGame = () => {
    setTurn("X")
    setWinner(undefined)
    setPositions(INITIAL_BOARD_OBJ)
    setDraw(false)
  }

  const setBg = (position: BoardObject) => {
    if(position.highlighter === 'X') return '#46A3FF'
    if(position.highlighter === 'O') return '#FF827E'
    return '#fff'
  }

  const isDisabled = () => {
    console.log(`draw ${draw}, winner ${winner}`)
    if(draw) return false

    if(winner) return false
    return true
  }

  return (
    <S.BoardScreenContainer>
      {winner ? <Confetti height={window.innerHeight} tweenDuration={10000} recycle={false} numberOfPieces={400}/> : null}
      <div className="board-winner">
        <S.InfoBox>
          {draw && !winner ? (
            <>
              <p>Temos um empate!</p>
            </>
          ): null}
          {winner ? (
            <p>{`${winner} é o Vencedor`}</p>
          ): null}
          {
            !draw && !winner ? (
              <p>{`É a vez de ${turn}`}</p>
            ) : null
          }
        </S.InfoBox>
        <S.BoardContainer>
          {
            positions.map((row, rowPosition) => 
              <S.BoardRow key={rowPosition}>
                {
                row.map((position, columPosition) => {
                  return <S.Square disabled={position.selected} bg={setBg(position)} onClick={() => handleSelectSquare(rowPosition, columPosition)} key={columPosition}>{position.selected ? position.highlighter : null}</S.Square>
                })
              }
              </S.BoardRow>
            )
          }
        </S.BoardContainer>
      </div>

      <button disabled={isDisabled()} className="new-game-button" onClick={handleNewGame}>Play again</button>
    </S.BoardScreenContainer>
  )
}