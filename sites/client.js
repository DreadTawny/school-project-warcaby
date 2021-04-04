const socket = io()
let game = "hello"
socket.on("hello", data => {
    console.log(data)
})

let room = prompt("Name your room or use existing name to join one")
let username = prompt("Type in your username")
socket.emit("join", [username, room])
socket.on("startTurn", data => {
   game.boardMap = JSON.parse(data.map)
   game.clearBoard()
   game.gameStart(data.player)
})
socket.on("chat", data => {
    console.log(data)
})

document.getElementById("send").addEventListener("click", () => {
    let message = document.getElementById("content").value 
    socket.emit("message", [message, room])
})
socket.on("message", data => {
    console.log(data)
    document.getElementById("messages").innerHTML += `<span class="username">${data.user }</span>: ${data.message}<br/>`
})
socket.on("playerAssign", data => {
    console.log(data)
    let gameLocal = new Board(data)
    game = gameLocal
})
socket.on("roomOverflow", data => {
    let newRoom = prompt(data)
    room = newRoom
    socket.emit("join", newRoom)
})
