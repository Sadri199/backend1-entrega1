import express from "express"
import { createCart, getCart, addProductToCart } from "../controllers/carts.controllers.js"

const router = express.Router()

//Carts Endpoints
router.post("/", createCart)
router.get("/:cid", getCart)
router.post("/:cid/product/:pid", addProductToCart)

export default router