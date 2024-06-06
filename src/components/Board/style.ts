
import styled from "styled-components";

export const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const BoardRow = styled.div`
  display: flex;
  flex-direction: row;
`

export type SquareProps = {
  bg:  '#46A3FF' | '#FF827E'
}
export const Square = styled.button<SquareProps>`
  width: 112px;
  height: 112px;
  margin: 7px;
  background-color: ${props => props.bg ?? '#fff'};
  cursor: pointer;
  font-size: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;

  &:disabled {
    color: rgba(255, 255, 255, 0.7);
  }
`

export const BoardScreenContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 24px;
  box-sizing: border-box;

  height: 100vh;
  width: 100vw;

  .board-winner {
    display: flex;
    position: relative;
    bottom: 10px;
    justify-content: center;
    flex-direction: column;
    height: 100%;
  }

  .new-game-button {
    padding: 15px 0 15px;
    width: 100%;
    max-width: 364px;
  }
`

export const InfoBox = styled.div`
  text-align: center;
  font-size: 2rem;
  margin-bottom: 43px;
`