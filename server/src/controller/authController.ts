import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { Request, Response } from "express";


// 5. Pass the adapter to the PrismaClient constructor
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        console.log(email, password);
        if (!password || !email) {
            return res.status(400).json({ message: "Name, email, and password are required" });
        }

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) return res.status(400).json({ message: "Email already exists" });

        const passwordHash = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: { name, email, passwordHash, role: "customer" },
        });


        res.status(201).json({
            success: true,
            message: "user registered successfully",
            userId: user.id,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Registration failed" });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;


        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        if (!user.passwordHash) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const validPassword = await bcrypt.compare(password, user.passwordHash);
        if (!validPassword) return res.status(400).json({ message: "Invalid credentials" });

        const accessToken = jwt.sign({ userId: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: "7d" });
        console.log(accessToken);


        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "none",
            path: "/",
            maxAge: 60 * 60 * 1000,
        });

        res.status(200).json({
            user: { id: user.id, name: user.name, email: user.email, role: user.role, profileImage: user.profileImageUrl }, accessToken,
            message: "Login successful"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Login failed" });
    }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
    res.clearCookie("accessToken");

    res.status(200).json({
        success: true,
        message: "user logged out successfully",
    });
};