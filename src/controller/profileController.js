export const profile = (req,res)=>{
    return res.status(200).json({
        message:"success",
        user:req.user
    })
}