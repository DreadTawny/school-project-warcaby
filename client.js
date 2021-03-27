const socket = io()
socket.on("hello", data => {
    console.log(data)
})
document.getElementById("send").addEventListener("click", () => socket.emit("chat", "Hello, can you hear us") )

socket.on("chat", data => {
    console.log(data)
})