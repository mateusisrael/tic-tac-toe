
import styled from "styled-components";

export const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const BoardRow = styled.div`
  display: flex;
  flex-direction: row;
`

export const Square = styled.div`
  width: 30px;
  height: 30px;
  margin: 5px;
  background-color: #fff;
  cursor: pointer;

  color: red;
  display: flex;
  justify-content: center;
  align-items: center;
`