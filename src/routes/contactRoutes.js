import express from "express"
import { createContactMessage } from "../controller/contactController.js"
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router()

// Sending a contact message requires a valid JWT token
router.post("/", authMiddleware, createContactMessage)

export default router
