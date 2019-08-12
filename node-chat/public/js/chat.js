// const io = io()
const socket = io();

socket.on('message', (message) => {
  console.log(message)
})