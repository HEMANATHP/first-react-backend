import {createProductService , getProductService , getProductByIdService , updateProductService,deleteProductService} from "../services/productServices.js"

// Shared validation: returns an error message string, or null if the data is valid
const validateProductData = (productData) => {
    const { name, price, description, stock, brand, image } = productData;
    if (!name || !price || !description || !stock || !brand || !image) {
        return "All fields are required: name, price, description, stock, brand, image";
    }
    const priceNum = Number(price);
    const stockNum = Number(stock);
    if (isNaN(priceNum) || priceNum <= 0) {
        return "Price must be a positive number";
    }
    if (isNaN(stockNum) || stockNum < 0) {
        return "Stock must be a non-negative number";
    }
    return null;
};

export const createProduct = async (req, res, next) => {
    try {
        const validationError = validateProductData(req.body || {});
        if (validationError) {
            return res.status(400).json({ message: validationError });
        }
        const product = await createProductService(req.body);
        return res.status(201).json({ message: "product added successfully", product });
    } catch (error) {
        next(error);
    }
};

export const getProduct = async (req, res, next) => {
    try {
        const product = await getProductService();
        return res.status(200).json({ message: "retreived all the products", product });
    } catch (error) {
        next(error);
    }
};

export const getProductById = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const product = await getProductByIdService(id);
        if (!product) {
            return res.status(404).json({ message: "product not found" });
        }
        return res.status(200).json({ message: "got the product", product });
    } catch (error) {
        next(error);
    }
};

export const updateProduct = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const validationError = validateProductData(req.body || {});
        if (validationError) {
            return res.status(400).json({ message: validationError });
        }
        const product = await updateProductService(id, req.body);
        return res.status(201).json({ message: "updated successfully", product });
    } catch (error) {
        next(error);
    }
};

export const deleteProduct = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        await deleteProductService(id);
        return res.json({ message: "deleted successfully" });
    } catch (error) {
        next(error);
    }
};
