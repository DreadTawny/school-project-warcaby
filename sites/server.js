// creating a http server to handle requests about game and websocket connection 

const http = require('http')
const static = require('node-static')
const file = new static.Server('./')
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
    
    socket.on("join", data => {
        users[socket.id] = data[0]
        if(!rooms[data[1]]) rooms[data[1]] = { "white": null, "black": null}
        if(rooms[data[1]][player[0]] === null) {
            rooms[data[1]][player[0]] = socket.id
            socket.emit("playerAssign", player[0])
        }
        else if(rooms[data[1]][player[0]] && !rooms[data[1]][player[1]]) {
            rooms[data[1]][player[1]] = socket.id
            socket.emit("playerAssign", player[1])
        }
        else {
            socket.emit("roomOverflow", "Too many players in a room. Please select a new one")
            socket.leave(data[1])
        }
        socket.join(data[1])
    }) 
    socket.on("turnEnd", data => {
        if(data.player === player[0]){
            io.to(data.room).emit("startTurn", { map: data.map, player: player[1]}) 
        }
        else {
            io.to(data.room).emit("startTurn",{map:data.map, player: player[0]}) 
        }
        
    })
   socket.on("message", data => {
       console.log(data)
       console.log(users[socket.id])
       io.to(data[1]).emit("message", {user: users[socket.id], message:data[0]})
   })
   socket.on("disconnect", data => {
      for(let room in rooms) {
          socket.leave(room)
          rooms[room] = null
          console.log(rooms)
      }
   })
    socket.emit("hello", "Welcome to the websocket")
    socket.on("chat", data => {
        console.log(data)
        io.sockets.emit("chat", data)
    })
})
app.listen(3000)
