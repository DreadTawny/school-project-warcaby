const socket = io()
let game = "hello"
const announcer = document.getElementById("announcer")
socket.on("hello", data => {
    console.log(data)
})

let username = prompt("Type in your username")
let room = prompt("Type in the room you want to join")
socket.emit("join", [username, room])
document.getElementById("join").addEventListener("click", () => {
    
})

socket.on("startTurn", data => {
   game.boardMap = JSON.parse(data.map)
   game.clearBoard()
   game.gameStart(data.player)
   announcer.innerHTML = `${data.player}'s turn`
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
    announcer.innerHTML = `You play as ${data}`
    let gameLocal = new Board(data)
    game = gameLocal
})

socket.on("roomOverflow", data => {
    let newRoom = prompt(data)
    room = newRoom
    socket.emit("join", newRoom)
})
