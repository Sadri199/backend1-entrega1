const connectButton = document.getElementById("connect-btn")
const printButton = document.getElementById("print-btn")

const clientConnection = io() //Activarse solamente al llegar a realTime
clientConnection.on("connection", (data)=>{
    console.log(data)
})

connectButton.addEventListener("click", ()=>{
    console.log("Button working")
    clientConnection.emit("message", "Connected?")
})

printButton.addEventListener("click", ()=>{ //Ahora que recibo la info, ver como mandar el get por socket
    console.log("Another button")
    clientConnection.emit("products", "Give me the products!")
    clientConnection.on("giveProducts", (data)=> {
        const product = document.createElement("p")
        product.textContent = data
        const renderProduct = document.getElementById("render-product").appendChild(product)
    })
})