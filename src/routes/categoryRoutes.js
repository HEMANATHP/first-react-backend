import express from "express"
import { createCategory, getCategory, getCategoryById, updateCategory, deleteCategory } from "../controller/categoryController.js"
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router()

// READ endpoints are public - anyone can browse categories
router.get("/", getCategory)
router.get("/:id", getCategoryById)

// WRITE endpoints require a valid JWT token
router.post("/", authMiddleware, createCategory)
router.put("/:id", authMiddleware, updateCategory)
router.delete("/:id", authMiddleware, deleteCategory)

export default router
