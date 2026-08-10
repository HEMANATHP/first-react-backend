import prisma from "../config/prisma.js";

// Create an order. The total is computed on the SERVER from the
// products table - we never trust a total coming from the client.
export const createOrderService = async (userId, orderData) => {
    const { items, shippingAddress, city, postalCode } = orderData;

    // Load every product that was ordered (one query, not one per item)
    const productIds = items.map((item) => item.productId);
    const products = await prisma.product.findMany({
        where: { id: { in: productIds } },
    });

    // Build the order item rows and compute the total server-side
    let total = 0;
    const orderItems = items.map((item) => {
        const product = products.find((p) => p.id === item.productId);
        if (!product) {
            throw new Error(`Product with id ${item.productId} not found`);
        }
        total += product.price * item.quantity;
        return {
            productId: product.id,
            productName: product.name, // snapshot the name at order time
            quantity: item.quantity,
            price: product.price, // snapshot the price at order time
        };
    });

    // Run everything in ONE transaction so a failure rolls back
    // all changes (stock updates + order + items are saved together)
    const order = await prisma.$transaction(async (tx) => {
        // Reduce stock for each ordered product
        for (const item of items) {
            await tx.product.update({
                where: { id: item.productId },
                data: { stock: { decrement: item.quantity } },
            });
        }

        // Create the order with its items in the same transaction
        return tx.order.create({
            data: {
                userId,
                total,
                shippingAddress,
                city,
                postalCode,
                items: { create: orderItems },
            },
            include: { items: true },
        });
    });

    return order;
}

// Return the logged-in user's orders with their items
export const getOrdersService = async (userId) => {
    const orders = await prisma.order.findMany({
        where: { userId },
        include: { items: true },
        orderBy: { createdAt: "desc" }, // newest orders first
    });
    return orders;
}
