import prisma from "../config/prisma.js";
export const createProductService = async (productData) => {
    const newproduct = await prisma.product.create({
      data: productData,
    });
    console.log(newproduct);
    return newproduct;
}

export const getProductService = async()=>{
    const product = await prisma.product.findMany()
    return product
}

export const getProductByIdService = async(id)=>{
    const product = await prisma.product.findUnique({
        where:{id}
    })
    return product;
}
export const updateProductService = async(id,productData)=>{
        const product = await prisma.product.update({
        where:{id},data:productData
    })
    return product;
}

export const deleteProductService = async(id)=>{
        const product = await prisma.product.delete({
            where:{id}
        })
        return product;

}