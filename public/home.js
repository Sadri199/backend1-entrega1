const connectButton = document.getElementById("connect-btn")

const clientConnection = io()

clientConnection.on("connection", ()=>{
    console.log(`Connected to server!`)
})

connectButton.addEventListener("click", ()=>{
    console.log("Button working")
    clientConnection.emit("message", "Connected?")
})