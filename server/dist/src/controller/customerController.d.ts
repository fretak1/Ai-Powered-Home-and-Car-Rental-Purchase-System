import type { Response } from "express";
import type { AuthenticatedRequest } from "../middleware/authMiddleware.js";
export declare const getCustomer: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=customerController.d.ts.map