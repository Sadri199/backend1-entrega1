import { ProductManager } from "../managers/productManager.js"

export const getHome = (req, res) => {
    const newManager = new ProductManager()
    const getProduct = newManager.getProduct()
    getProduct
        .then((data)=>{
            console.log("entre acá")
            const allProducts = data
            res.render("home", allProducts)
        }).catch((err)=>{
            console.error(err)
        })
}