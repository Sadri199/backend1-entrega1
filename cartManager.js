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
    async getCart(id){
    try{ //me quede por acá
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
}