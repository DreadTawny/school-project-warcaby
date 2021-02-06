// creating a http server to handle requests about game and websocket connection 

const http = require('http');
http.createServer( (req,res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'})
    res.end('Hello world')
}).listen(8080)