import express from "express"
import { getProduct, createProduct, getProductByID, updateProduct, deleteProduct } from "../controllers/products.controllers.js"

const router = express.Router()

//Products Endpoints
router.get("/", getProduct)
router.get("/:pid", getProductByID)
router.post("/", createProduct)
router.put("/:pid", updateProduct)
router.delete("/:pid", deleteProduct)


export default router