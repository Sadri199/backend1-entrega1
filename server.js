import express from "express"
import { ProductManager } from "./productManager.js"

const app = express()
const newManager = new ProductManager()

const PORT = 8080

app.use(express.json())

app.get("/api/products", (req, res)=> {
    const readJson = newManager.getProduct()
    readJson
        .then((data) =>{
            res.status(200)
            res.send(data)
        })
        .catch((data)=> {
            res.status(500)
            res.send(data)
        })

})

app.post("/api/products",(req, res)=> {
    try{
        const newProduct = {
            title:  req.body.title,
            description: req.body.description,
            code: req.body.code,
            price: req.body.price,
            status: req.body.status,
            stock: req.body.stock,
            category: req.body.category,
            thumbnail: req.body.thumbnail
        }
        const createProduct = newManager.addProduct(newProduct)
        createProduct
            .then(()=> {
                res.status(200)
                res.json({status: "Succesful", message: "Product added correctly to our Database!"})
            })
            .catch((data)=> {
                res.status(500)
                res.send(data)
            })
    }catch(err){
        console.log("Here is the errror: " + err)
        res.status(400)
        res.send("Something went wrong and we couldn't add that product to our Database.")
    }

})

app.get("/api/products/:pid", (req, res)=> {
    const id = req.params.pid
    const readJson = newManager.getProductByID(id)
    readJson
        .then((data) =>{
            res.status(200)
            res.send(data)
        })
        .catch((data)=> {
            res.status(500)
            res.send(data)
        })
})

app.put("/api/products/:pid",(req, res)=> { //ID dinámico
    const id = req.params.pid

    
    res.status(201)
    res.send("My first Put")

})

export const openServer = () => {app.listen(PORT, () => {
    console.log(`Server open at ${PORT}`)
}) }
