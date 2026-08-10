import { createCategoryService, getCategoryService, getCategoryByIdService, updateCategoryService, deleteCategoryService } from "../services/categoryServices.js"

// Shared validation: returns an error message string, or null if the data is valid
const validateCategoryData = (categoryData) => {
    const { name } = categoryData;
    if (!name) {
        return "Name is required";
    }
    return null;
};

export const createCategory = async (req, res, next) => {
    try {
        const validationError = validateCategoryData(req.body || {});
        if (validationError) {
            return res.status(400).json({ message: validationError });
        }
        const category = await createCategoryService(req.body);
        return res.status(201).json({ message: "category added successfully", category });
    } catch (error) {
        next(error);
    }
};

export const getCategory = async (req, res, next) => {
    try {
        const category = await getCategoryService();
        return res.status(200).json({ message: "retreived all the categories", category });
    } catch (error) {
        next(error);
    }
};

export const getCategoryById = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const category = await getCategoryByIdService(id);
        if (!category) {
            return res.status(404).json({ message: "category not found" });
        }
        return res.status(200).json({ message: "got the category", category });
    } catch (error) {
        next(error);
    }
};

export const updateCategory = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const validationError = validateCategoryData(req.body || {});
        if (validationError) {
            return res.status(400).json({ message: validationError });
        }
        const category = await updateCategoryService(id, req.body);
        return res.status(201).json({ message: "updated successfully", category });
    } catch (error) {
        next(error);
    }
};

export const deleteCategory = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        await deleteCategoryService(id);
        return res.json({ message: "deleted successfully" });
    } catch (error) {
        next(error);
    }
};
