import express from 'express'
import { createServer } from 'http'
import { disconnect } from 'process'
import { Server } from 'socket.io'

const app = express()
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*'
  }
})

app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>')
})

io.on('connection', (socket) => {
  console.log('A user connected')

  socket.on('disconnect', () => {
    console.log('A client has ben disconnect')
  })

  socket.on('game_movement', (snapshot) => {
    console.log('[server] game_movement')
    console.log(snapshot)
    io.emit('game_movement', snapshot)
  })
})

server.listen(3001, () => {
  console.log('🚀 Server ready at port 3001!')
})