import prisma from "../config/prisma.js"



export const loginService = async(email,password)=>{
    const user = await prisma.user.findUnique({
    where:{email}
})

    if(!user){
        return null
    }

    if(user.password !== password){
        return null;
    }
    return user
}
 