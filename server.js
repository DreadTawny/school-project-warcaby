// creating a http server to handle requests about game and websocket connection 

const http = require('http')
const static = require('node-static')
const file = new static.Server('./')
const app = http.createServer((req, res) => {
    req.addListener("end", () => {
        file.serve(req, res)
    }).resume()
})
let users = { 

}
const io = require('socket.io')(app)
io.on("connection", socket => {
    socket.on("join", data => {
        users[socket.id] = data
    }) 
    socket.on("host", data => {
        
    })
    console.log("New connnection")
    socket.emit("hello", "Welcome to the websocket")
    socket.on("chat", data => {
        console.log(data)
        io.sockets.emit("chat", data)
    })
})
app.listen(3000)
