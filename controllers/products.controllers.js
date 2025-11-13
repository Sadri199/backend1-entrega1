import { ProductManager } from "../managers/productManager.js"

export const getProduct = (req, res)=> {
    const newManager = new ProductManager()
    const readJson = newManager.getProduct()
    readJson
        .then((data) =>{
            res.status(200)
            res.send(data)
        })
        .catch((data)=> {
            res.status(500)
            res.send({Error: `${data.message}`})
        })
}

export const createProduct = (req, res)=> {
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

    const newManager = new ProductManager(newProduct.title,newProduct.description,newProduct.code,newProduct.price,newProduct.status,newProduct.stock,newProduct.category,newProduct.thumbnail)
    const createProduct = newManager.addProduct(newManager)
    createProduct
        .then(()=> {
            res.status(200)
            res.json({status: "Succesful", message: "Product added correctly to our Database!"})
        })
        .catch((data)=> {
            res.status(500)
            res.send({Error: `${data.message}`})
        })
}

export const getProductByID = (req, res)=> {
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
            res.send({Error: `${data.message}`})
        })
}

export const updateProduct = (req, res)=> {
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
            res.send({Error: `${data.message}`})
        })
}

export const deleteProduct = (req, res) => {
    const id = req.params.pid
    const newManager = new ProductManager()
    const productDelete = newManager.deleteProduct(id)
    productDelete
        .then((data) => {
            res.status(202)
            res.send({Message: `${data}`})
        }).catch((data)=> {
            res.status(500)
            res.send({Error: `${data.message}`})
        })
}