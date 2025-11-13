import fs from "fs/promises"

export class CartManager {
    constructor(products){
        this.id = Math.floor(Math.random() * (5000000 - 100) + 100)
        this.products=[products]
    }

    async createCart(data){
        data.id = this.id
        try{
            const getJson = await fs.readFile("./db/carts.json", {encoding: "utf8"})
            console.log("Reading file...")
            const currentData = getJson
            const parsed = JSON.parse(currentData)
            parsed.carts.push(data)
            const stringify = JSON.stringify(parsed)
            const addJson = await fs.writeFile("./db/carts.json", stringify)
            console.log("carts.json created or edited!")
            return data.id
        }catch(err){
            console.log("Something went wrong creating or updating the file: " + err)
            return "Internal Server Error, we couldn't create your cart."
        }
    }
    async getCart(cid){
        try{
            const getJson = await fs.readFile("./db/carts.json", {encoding: "utf8"})
            console.log("Reading file...")
            const convertJson = JSON.parse(getJson)
            const arrayCarts = convertJson.carts
            const filteredCart = arrayCarts.filter(cart => cart.id == cid)
            if(filteredCart.length == 0){
                return "Not a valid Cart ID."
            }
            for (let i = 0; i < filteredCart.length; i++){
                return filteredCart[i]
            }
        }catch (err){
                console.log("Something went wrong while retrieving the file: " + err)
                return "Internal Server Error, we couldn't retrieve your cart."
        }
    }

    async addToCart(cid, pid, quantity){
        try{
            const getJson = await fs.readFile("./db/carts.json", {encoding: "utf8"})
            console.log("Reading file...")
            const convertJson = JSON.parse(getJson)
            const arrayCarts = convertJson.carts
            const filteredCart = arrayCarts.filter(cart => cart.id == cid)
            if(filteredCart.length == 0){
                throw new Error("Not a valid Cart ID.")
            }
            const popCart = filteredCart.pop()

            const newProduct = {product: pid, quantity: quantity}
            const validator = popCart.products.some(a => a.product == pid)
            if (validator){
                const oldProduct = popCart.products.filter(a => a.product == pid).pop()
                oldProduct.quantity = newProduct.quantity
                const updatedProduct = {...popCart.products, ...oldProduct}
                
                console.log(updatedProduct)
                //popCart.products = [newProduct]
            } else {
                popCart.products.push(newProduct)
            }
            
            arrayCarts.splice(arrayCarts.findIndex(cart => cart.id == cid), 1)
            arrayCarts.push(popCart)

            const stringify = JSON.stringify(convertJson)
            const addJson = await fs.writeFile("./db/carts.json", stringify)
            console.log("carts.json edited!")
            return `The Product ${pid} was added or modified to the Cart ${cid} !`
        }catch(err){
            console.log("Something went wrong while retrieving the file: " + err)
            throw new Error("Not a valid Cart ID!")
        }
    }
}