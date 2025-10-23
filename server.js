import express from "express"

const app = express()

const PORT = 8080

app.use(express.json())

app.get("/api/products", (req, res)=> {
    console.log("Inside Get Products")
    res.status(200)
    res.send("My first Get")

})

app.post("/api/products",(req, res)=> {
    console.log("Inside POST Products")
    res.status(200)
    res.send("My first Post")

})

app.put("/api/products",(req, res)=> { //ID dinámico
    console.log("Inside Put Products")
    res.status(201)
    res.send("My first Put")

})

export const openServer = () => {app.listen(PORT, () => {
    console.log(`Server open at ${PORT}`)
}) }
