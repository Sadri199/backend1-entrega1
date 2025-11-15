import { ProductManager } from "../managers/productManager.js"

export const getLiveProducts = (req, res) => { //Transformar a WebSocket
    const newManager = new ProductManager()
    const getProduct = newManager.getProduct()
    getProduct
        .then((data)=>{
            const allProducts = data
            res.render("realTimeProducts", allProducts)
        }).catch((err)=>{
            console.error(err)
        })
}