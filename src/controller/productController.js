import {createProductService , getProductService , getProductByIdService , updateProductService,deleteProductService} from "../services/productServices.js"

export const createProduct = async(req,res)=>{

    const productData = req.body
    if(!productData){
        return null;
    }
    const product = await createProductService(productData)
    return res.status(201).json({
        message:"product added successsfully",
        product
    })
}

export const getProduct = async(req,res)=>{
    const product = await getProductService()
    return res.status(200).json({
        message:"retreived all the products",
        product
    })
}

export const getProductById = async(req,res)=>{
    const id = Number(req.params.id )
    const product = await getProductByIdService(id)
    return res.status(200).json
({
    message:"got the product",
    product
})}

export const updateProduct = async(req,res)=>{
    const id =Number(req.params.id)
    const productData = req.body
    const product = await updateProductService(id,productData)
    return res.status(201).json({
        message:"updated successfully",
        product
    })
}

export const deleteProduct = async(req,res)=>{
    const id = Number(req.params.id)
    try{
        await deleteProductService(id)
        return res.json({
            message:"deleted successfully",
        })
    }
    catch(error){
        return res.status(404).json({
            message:"no such product exixts"
        })
    }
}