import express from "express"
import { createProduct,getProduct,getProductById,updateProduct,deleteProduct } from "../controller/productController.js"
import { authMiddleware } from '../middleware/authMiddleware.js';


const router =express.Router()
// router.get("/product",authMiddleware,product)
router.post("/",createProduct)
router.get("/",getProduct)
router.get("/:id",getProductById)
router.put("/:id",updateProduct)
router.delete("/:id",deleteProduct)

export default router