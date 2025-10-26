import fs from "fs/promises"

export class ProductManager {

    constructor(title, description, code, price, status, stock, category, thumbnail){
        this.id = Math.floor(Math.random() * (5000000 - 100) + 100) 
        this.title = title
        this.description = description
        this.code = code
        this.price = price
        this.status = status
        this.stock = stock
        this.category = category
        this.thumbnail = [thumbnail]
    }

    async addProduct (data) {
        data.id = this.id

        try{
            const getJson = await fs.readFile("./db/products.json", {encoding: "utf8"})
            console.log("Reading file...")
            const currentData = getJson
            const parsed = JSON.parse(currentData)
            parsed.games.push(data)
            const stringify = JSON.stringify(parsed)
            const addJson = await fs.writeFile("./db/products.json", stringify)
            console.log("products.json created or edited!")
        } catch (err){
            console.log("Something went wrong creating or updating the file: " + err)
            return "Internal Server Error, we couldn't add that product."
        }
    }

    async getProduct () {
        try{
            const getJson = await fs.readFile("./db/products.json", {encoding: "utf8"})
            console.log("Reading file...")
            const convertJson = JSON.parse(getJson)
            return convertJson
        } catch (err){
            console.log("Something went wrong reading the file: " + err)
            return "Internal Server Error, we couldn't retrieve the Database."
        }
    }

    async getProductByID (id) {
        try{
            const getJson = await fs.readFile("./db/products.json", {encoding: "utf8"})
            console.log("Reading file...")
            const convertJson = JSON.parse(getJson)
            const arrayGames = convertJson.games
            const filteredGame = arrayGames. filter(game => game.id == id)
            for (let i = 0; i < filteredGame.length; i++){
                return filteredGame[i]
            }
        }catch (err){
            console.log("Something went wrong while retrieving the file: " + err)
            return "Internal Server Error, we couldn't retrieve that product."
        }
    }

    async updateProduct (idGame, data){
        try{
            const allProducts = await this.getProduct()
            const arrayGames = allProducts.games
            const oldProduct = arrayGames.filter(game => game.id == idGame)
            const popProduct = oldProduct.pop()

            const {id, ...rest} = data
            const updatedProduct = {...popProduct, ...rest}

            arrayGames.splice(arrayGames.findIndex(game => game.id == idGame), 1)
            arrayGames.push(updatedProduct)

            const stringify = JSON.stringify(allProducts)
            const addJson = await fs.writeFile("./db/products.json", stringify)
            console.log("products.json edited succesfully!")
            return `Game with id ${idGame} updated correctly!`
        }catch(err){
            console.log("Something went wrong while editing the file: " + err)
            return "Internal Server Error, we couldn't edit the product."
        }
    }

    async deleteProduct (id){
        try{
            const getJson = await fs.readFile("./db/products.json", {encoding: "utf8"})
            console.log("Reading file...")
            const convertJson = JSON.parse(getJson)
            const arrayGames = convertJson.games
            arrayGames.splice(arrayGames.findIndex(game => game.id == id), 1)

            const stringify = JSON.stringify(convertJson)
            const addJson = await fs.writeFile("./db/products.json", stringify)
            console.log("products.json edited succesfully!")
            return `Game with id ${id} removed correctly!`
        }catch(err){
            console.log("Something went wrong while removing the product: " + err)
            return "Internal Server Error, we couldn't delete that product."
        }
    }
}

// const init = new ProductManager()

// init.addProduct({
//     title: "Granddad 7",
//     description: "Flintstones",
//     code: "BTLG-1",
//     price: 500,
//     status: true,
//     stock: 5000000,
//     category: "Platformer",
//     thumbnail: ["https://i.kym-cdn.com/entries/icons/original/000/020/037/7_Grand_Dad_Banner.jpg"]
// })