import prisma from "../config/prisma.js"
import { loginService, registerService } from "../services/authServices.js"

 export const login =  async(req,res)=>{
    const {email,password}= req.body

    if(!email || !password){
      return res.status(400).json({
        message:"email and password are required"
      })
    } 
    const loginData = await loginService(email,password)


    if (!loginData) {
    return res.status(401).json({
        message: "Invalid authentication"
    });
}
    const {user,token} = loginData;
    if(!user){
      return res.status(401).json({message:"invalid authentication error"})
    }
    
    return res.status(200).json({message:"success",token,user})
    }

    export const register = async(req,res)=>{
      const {name,email,password}=req.body;

      if(!email || !name || !password){
        return res.status(400).json({message:"all fields are required"})
      }
      const user = await registerService(name,email,password)

      if(!user){
        return res.status(409).json({
          message:"email already present try to login"
        })
      }
      else{
        return res.status(201).json({
          message:"user registered successfully"
        })
      }
    }