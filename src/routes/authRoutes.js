import express from 'express'
import { login } from '../controller/authController.js';
import { register } from '../controller/authController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { profile } from '../controller/profileController.js';

const router = express.Router()

router.post("/login",login)
router.post("/register",register)
router.get("/profile",authMiddleware,profile)
export default router;