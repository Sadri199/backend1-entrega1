import express from "express"
import { ProductManager } from "./productManager.js"
import { CartManager } from "./cartManager.js"

//Main Configurations
const app = express()
const PORT = 8080

app.use(express.json())

const newCartManager = new CartManager()

//Products Endpoints
app.get("/api/products", (req, res)=> {
    const newManager = new ProductManager()
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

app.post("/api/products", (req, res)=> {
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

    const newManager = new ProductManager(newProduct)
    const createProduct = newManager.addProduct(newManager)
    createProduct
        .then(()=> {
            res.status(200)
            res.json({status: "Succesful", message: "Product added correctly to our Database!"})
        })
        .catch((data)=> {
            res.status(500)
            res.send(data)
        })
})

app.get("/api/products/:pid", (req, res)=> {
    const id = req.params.pid
    const newManager = new ProductManager()
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

app.put("/api/products/:pid", (req, res)=> {
    const id = req.params.pid
    const productData = req.body
    const newManager = new ProductManager()
    const productUpdate = newManager.updateProduct(id, productData)
    productUpdate
        .then((data) => {
            res.status(201)
            res.send(data)
        }).catch((data)=> {
            res.status(500)
            res.send(data)
        })
})

app.delete("/api/products/:pid", (req, res) => {
    const id = req.params.pid
    const newManager = new ProductManager()
    const productDelete = newManager.deleteProduct(id)
    productDelete
        .then((data) => {
            res.status(202)
            res.send(data)
        }).catch((data)=> {
            res.status(500)
            res.send(data)
        })
})

//Carts Endpoints
app.post("/api/carts", (req,res) => {
    const newCart = {
        products:  req.body.products,
    }

    const cartCreate = newCartManager.createCart(newCart)
    cartCreate
        .then((id)=> {
            res.status(200)
            res.send(`Your cart was created correctly! ID: ${id}`)
        })
        .catch((data)=> {
            res.status(500)
            res.send(data)
        })
})

app.get("/api/carts/:cid", (req, res)=>{
    const id = req.params.cid
    const cartGet = newCartManager.getCart(id)
    cartGet
        .then((data) =>{
            res.status(200)
            res.send(data)
        })
        .catch((data)=> {
            res.status(500)
            res.send(data)
        })
})

app.post("/api/carts/:cid/product/:pid", (req, res)=>{
    const cid = req.params.cid
    const pid = req.params.pid
    const quantity = req.body.quantity

    const productAdd = newCartManager.addToCart(cid, pid, quantity)
    productAdd
        .then((data) =>{
            res.status(200)
            res.send({Message: data})
        })
        .catch((err)=> {
            res.status(500)
            res.send({Error: err.message})
        })
})

export const openServer = () => {app.listen(PORT, () => {
    console.log(`Server open at ${PORT}`)
}) }
