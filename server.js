import express from "express"
import http from "http"
import { Server } from "socket.io"
import homeRouter from "./routes/home.route.js"
import liveProductsRouter from "./routes/realTime.route.js"
import productsRouter from "./routes/products.route.js"
import cartsRouter from "./routes/carts.route.js"

import handlebars from "express-handlebars"


//Main Configurations
const app = express()
const PORT = 8080
const httpServer = http.createServer(app)
const wsServer = new Server(httpServer)

wsServer.on("connection", (socket)=> {
    const clientId = socket.id
    console.log(`New client connected! Client: ${clientId}`)
    
    socket.on("message", ()=>{
        socket.emit("response", `Yes client ${clientId}, you are connected.`)
    })
})

app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')

app.use(express.json())
app.use(express.static("public"))
app.use("/", homeRouter)
app.use("/realtimeproducts", liveProductsRouter)
app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)

export const openServer = () => {httpServer.listen(PORT, () => {
    console.log(`Server open at ${PORT}`)
}) }
