import express from 'express'
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'
import productRoutes from './routes/productRoutes.js'
const app = express();

app.use(express.json())
app.use(cors())
app.use("/api/auth",authRoutes)
app.use("/api/products",productRoutes)


app.get("/",(req,res)=>{
    res.json({message:"welcome  "})
})

// 404 handler - catches any URL that didn't match a route above
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

// Global error handler - receives errors via next(error)
// Must have 4 parameters (err, req, res, next) to be recognized as error middleware
app.use((err, req, res, next) => {
    // Prisma error code P2025 = record not found (e.g. delete/update missing id)
    if (err.code === "P2025") {
        return res.status(404).json({ message: "Record not found" });
    }
    console.error(err.message);
    res.status(500).json({ message: err.message || "Internal server error" });
});

export default app
