import express from "express"
import { ProductManager } from "./productManager.js"
import { CartManager } from "./cartManager.js"

const app = express()
const newManager = new ProductManager()
const newCartManager = new CartManager()

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

app.put("/api/products/:pid", (req, res)=> {
    const id = req.params.pid
    const productData = req.body
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

app.get("/api/carts", (req, res)=>{
    const id = req.params.pid //me quede por acá
    const readJson = newCartManager
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

export const openServer = () => {app.listen(PORT, () => {
    console.log(`Server open at ${PORT}`)
}) }
