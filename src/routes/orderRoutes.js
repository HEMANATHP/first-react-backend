import express from "express"
import { createOrder, getOrders } from "../controller/orderController.js"
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router()

// Orders are private - both endpoints need a valid JWT token
router.post("/", authMiddleware, createOrder)
router.get("/", authMiddleware, getOrders)

export default router
