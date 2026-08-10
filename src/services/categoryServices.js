import prisma from "../config/prisma.js";

// Create a new category (mirrors the product create pattern)
export const createCategoryService = async (categoryData) => {
    const newCategory = await prisma.category.create({
        data: categoryData,
    });
    console.log(newCategory);
    return newCategory;
}

// Get every category - public browsing
export const getCategoryService = async () => {
    const categories = await prisma.category.findMany()
    return categories
}

// Get a single category by its id
export const getCategoryByIdService = async (id) => {
    const category = await prisma.category.findUnique({
        where: { id }
    })
    return category;
}

// Update a category's fields
export const updateCategoryService = async (id, categoryData) => {
    const category = await prisma.category.update({
        where: { id }, data: categoryData
    })
    return category;
}

// Delete a category
export const deleteCategoryService = async (id) => {
    const category = await prisma.category.delete({
        where: { id }
    })
    return category;
}
