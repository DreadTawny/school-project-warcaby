// creating a http server to handle requests about game and websocket connection 

const http = require('http')
const staticServ = require('node-static')
const file = new staticServ.Server('./')
const app = http.createServer((req, res) => {
    req.addListener("end", () => {
        file.serve(req, res)
    }).resume()
})
let rooms = { 

}
let users = {

}
const player = ["white","black" ]
const io = require('socket.io')(app)
io.on("connection", socket => {
    rooms[socket.id.slice(0, 15)] = { "white": socket.id, "black": null}
  console.log(rooms)
    socket.join(socket.id.slice(0,15))
    socket.emit("showID", socket.id)
  socket.on("user", data => {
    users[socket.id] = data
  })
    socket.on("join", data => {
        if(data[0]) users[socket.id] = data[0]
        if(data[1]){ 
          let roomID = data[1].slice(0,15)
            if(!rooms[roomID][player[1]]) {
                rooms[roomID][player[1]] = socket.id
            }
            else {
                socket.emit("roomOverflow", "Too many players in a room. Please select a new one")
                socket.leave(data[1].slice(0,15))
            }
            socket.join(data[1].slice(0,15))
            socket.to(data[1]).emit("serverAnnouncment", `User ${users[socket.id]} has joined the room`)
            let white = rooms[roomID].white
            let black = rooms[roomID].black
            io.to(white).emit("playerAssign", player[0])
            io.to(black).emit("playerAssign", player[1])
            console.log(rooms)
        }
        else socket.emit("roomError","No such room exists, please try again")

    }) 
    socket.on("turnEnd", data => {
        console.log(data.player)
        console.log(data)
        if(data.player === player[0]){
            console.log("test")
            console.log(rooms[data.room.slice(0,15)])
            io.to(data.room.slice(0,15)).emit("startTurn",{map:data.map, player: player[1]})  
        }
        else {
            io.to(data.room.slice(0,15)).emit("startTurn",{map:data.map, player: player[0]}) 
        }
        
    })
   socket.on("message", data => {
       io.to(data[1].slice(0,15)).emit("message", {user: users[socket.id], message:data[0]})
   })
    
    socket.emit("hello", "Welcome to the websocket")
    socket.on("chat", data => {
        io.sockets.emit("chat", data)
    })
})
app.listen(3000)
