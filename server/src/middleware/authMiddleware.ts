import type { NextFunction, Request, Response } from "express";
import { jwtVerify } from "jose";
import type { JWTPayload } from "jose";

export interface AuthenticatedRequest extends Request {
    user?: {
        userId: string;
        email: string;
        role: string;
    };
}

export const authenticateJwt =
    (allowedRoles: string[] = []) =>
        async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
            try {
                const accessToken = req.cookies.accessToken;

                if (!accessToken) {
                    return res
                        .status(401)
                        .json({ success: false, error: "Access token is not present" });
                }

                // ✅ Verify & decode token
                const { payload } = await jwtVerify(
                    accessToken,
                    new TextEncoder().encode(process.env.JWT_SECRET!)
                );

                const user = payload as JWTPayload & {
                    userId: string;
                    email: string;
                    role: string;
                };

                // ✅ Attach user to request
                req.user = {
                    userId: user.userId,
                    email: user.email,
                    role: user.role,
                };

                // ✅ ROLE CHECK GOES HERE ✅
                if (
                    allowedRoles.length > 0 &&
                    !allowedRoles.includes(user.role.toLowerCase())
                ) {
                    return res.status(403).json({ message: "Access Denied" });
                }

                next();
            } catch (err) {
                console.error("JWT error:", err);
                return res.status(401).json({ message: "Invalid or expired token" });
            }
        };
