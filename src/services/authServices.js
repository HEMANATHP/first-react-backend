import prisma from "../config/prisma.js"
import bcrypt from "bcrypt"
export const loginService = async(email,password)=>{
    const user = await prisma.user.findUnique({
    where:{email}
})

    if(!user){
        return null
    }
    const ismatched =  await bcrypt.compare(password,user.password)
    if(!ismatched){
        return null
    }
    return user
}

export const registerService = async(name,email,password)=>{
    const user = await prisma.user.findUnique({
        where:{
            email
        }
    })  
    const hashedPassword = await bcrypt.hash(password,10)

    if(user){
        return null
    }
    else{
       const newUser =  await prisma.user.create({
            data:{
                  name: name,
                  email: email,
                  password:hashedPassword
            }
        })

        return newUser
      }
}
 