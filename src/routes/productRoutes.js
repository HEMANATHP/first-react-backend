import express from "express"
import { createProduct,getProduct,getProductById,updateProduct,deleteProduct } from "../controller/productController.js"
import { authMiddleware } from '../middleware/authMiddleware.js';


const router =express.Router()

// READ endpoints are public - anyone can browse products
router.get("/",getProduct)
router.get("/:id",getProductById)

// WRITE endpoints require a valid JWT token
router.post("/",authMiddleware,createProduct)
router.put("/:id",authMiddleware,updateProduct)
router.delete("/:id",authMiddleware,deleteProduct)

export default router
