import type { Response } from "express";
import type { AuthenticatedRequest } from "../middleware/authMiddleware.js";
export declare const getProvider: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=providerController.d.ts.map