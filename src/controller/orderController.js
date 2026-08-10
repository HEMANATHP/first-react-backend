import { createOrderService, getOrdersService } from "../services/orderServices.js"

// Shared validation: returns an error message string, or null if the data is valid
const validateOrderData = (orderData) => {
    const { items, shippingAddress, city, postalCode } = orderData;
    if (!items || !Array.isArray(items) || items.length === 0) {
        return "items must be a non-empty array of { productId, quantity }";
    }
    for (const item of items) {
        if (!item.productId || !item.quantity || item.quantity <= 0) {
            return "each item needs a valid productId and a positive quantity";
        }
    }
    if (!shippingAddress || !city || !postalCode) {
        return "All fields are required: items, shippingAddress, city, postalCode";
    }
    return null;
};

export const createOrder = async (req, res, next) => {
    try {
        const validationError = validateOrderData(req.body || {});
        if (validationError) {
            return res.status(400).json({ message: validationError });
        }
        // req.user comes from the auth middleware (the logged-in user)
        const order = await createOrderService(req.user.id, req.body);
        return res.status(201).json({ message: "order created successfully", order });
    } catch (error) {
        next(error);
    }
};

export const getOrders = async (req, res, next) => {
    try {
        // Only return this user's own orders
        const orders = await getOrdersService(req.user.id);
        return res.status(200).json({ message: "retreived all the orders", orders });
    } catch (error) {
        next(error);
    }
};
