import { createContactMessageService } from "../services/contactServices.js"

export const createContactMessage = async (req, res, next) => {
    try {
        const { message } = req.body || {};
        if (!message) {
            return res.status(400).json({ message: "message is required" });
        }
        // req.user comes from the auth middleware (the logged-in user)
        const contactMessage = await createContactMessageService(req.user.id, { message });
        return res.status(201).json({ message: "contact message sent successfully", contactMessage });
    } catch (error) {
        next(error);
    }
};
