import { useEffect } from "react"
import { Board } from "../../components/Board"
import { socket } from "../../socketConfig"


export const MatchScreen = () => {
  useEffect(() => {
    socket
  }, [])

  return (
    <div>
      <Board></Board>
    </div>
  )
}