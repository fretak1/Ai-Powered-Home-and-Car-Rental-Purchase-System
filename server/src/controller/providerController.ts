import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import type { AuthenticatedRequest } from "../middleware/authMiddleware.js";

const prisma = new PrismaClient();


export const getProvider = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { id } = req.params;

        // Validate that id exists
        if (!id) {
            return res.status(400).json({ message: "Provider ID is required" });
        }

        const provider = await prisma.user.findUnique({
            where: { id }, // ✅ id is guaranteed string now
        });

        if (!provider) {
            return res.status(404).json({ message: "Provider not found" });
        }

        res.status(200).json(provider);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to retrieve provider" });
    }
};


// export const createCustomer = async (req: AuthenticatedRequest, res: Response) => {
//     try {
//         const { id, name, email, phoneNumber } = req.body;
//         const customer = await prisma.user.create({ data: { id, name, email, phoneNumber } });
//         res.status(201).json(customer);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Failed to create customer" });
//     }
// };

// export const updateCustomer = async (req: Request, res: Response) => {
//     try {
//         const { id } = req.params;
//         const { name, email, password } = req.body;
//         const customer = await prisma.user.update({ where: { id }, data: { name, email, passwordHash: password } });
//         res.status(200).json(customer);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Failed to update customer" });
//     }
// };

// export const deleteCustomer = async (req: Request, res: Response) => {
//     try {
//         const { id } = req.params;
//         const customer = await prisma.user.delete({ where: { id } });
//         res.status(200).json(customer);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Failed to delete customer" });
//     }
// };

