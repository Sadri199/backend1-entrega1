import express from "express"
import { getLiveProducts } from "../controllers/realTime.controller.js"

const router = express.Router()

router.get("/", getLiveProducts)

export default router