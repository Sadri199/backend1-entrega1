import express from "express"
import homeRouter from "./routes/home.route.js"
import productsRouter from "./routes/products.route.js"
import cartsRouter from "./routes/carts.route.js"

import handlebars from "express-handlebars"


//Main Configurations
const app = express()
const PORT = 8080

app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')

app.use(express.json())
app.use(express.static("public"))
app.use("/", homeRouter)
app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)




export const openServer = () => {app.listen(PORT, () => {
    console.log(`Server open at ${PORT}`)
}) }
