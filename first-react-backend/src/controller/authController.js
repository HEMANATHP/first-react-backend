import { loginService } from "../services/authServices.js"

 export const login =  async(req,res)=>{
    const {email,password}= req.body

    if(!email || !password){
      return res.status(400).json({
        message:"email and password are required"
      })
    } 
    const user = await loginService(email,password)

    if(!user){
      return res.status(401).json({message:"invalid authentication error"})
    }
    
    return res.status(200).send("found the user and allowed")
    }