import jwt from "jsonwebtoken"
export const authMiddleware = (req,res,next)=>{
    const authHeader = req.headers.authorization

    if(!authHeader){
        return res.status(401).json({
            message:"unauthorized"
        })
    }
    const token = authHeader.split(" ")[1]
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user = decoded
        next()
    }
    catch(error){
        console.log(error.message)
        return res.status(401).json({
            message:"unauthorized access",
            user:req.user
        })
    }
}