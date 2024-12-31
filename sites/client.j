const socket = io()
let game = "hello"
const announcer = document.getElementById("announcer")
let room = "empty"
socket.on("hello", data => {
    console.log(data)
})
socket.on("showID", data => {
    console.log(data)
    console.log(room)
    room = data
    console.log(room)
})

let username = prompt("Type in your username")
// let room = prompt("Type in the room you want to join")
// socket.emit("join", [username, room])
document.getElementById("join").addEventListener("click", () => {
    room = prompt("Type in the room you want to join")
    socket.emit("join", [username, room])
})
socket.emit("username", username)
document.getElementById("showCode").addEventListener("click", () => {
    alert(room)
    
})


socket.on("startTurn", data => {
    console.log(data)
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
    document.getElementById("content").value = null
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
    game.clearBoard()
    game.gameStart()
})

socket.on("roomOverflow", data => {
    let newRoom = prompt(data)
    room = newRoom
    socket.emit("join", newRoom)
})

socket.on("roomError", data => {
    alert(data)
})
socket.on("serverAnnouncment", data => {
    document.getElementById("messages").innerHTML += ` <i>${data}</i><br/>`
})