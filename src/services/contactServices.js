import prisma from "../config/prisma.js";

// Save a contact message using the logged-in user's name and email.
// The JWT only carries id/email/role, so we fetch the user to get the name.
export const createContactMessageService = async (userId, messageData) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
    });

    const contactMessage = await prisma.contactMessage.create({
        data: {
            name: user.name,
            email: user.email,
            message: messageData.message,
        },
    });
    console.log(contactMessage);
    return contactMessage;
}
