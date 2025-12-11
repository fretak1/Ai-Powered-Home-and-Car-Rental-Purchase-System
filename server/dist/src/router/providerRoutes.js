import express from "express";
import { login, register } from "../controller/authController.js";
import { getProvider,
// createProvider,
// updateProvider,
// getCurrentResidences,
// addFavoriteProperty,
// removeFavoriteProperty,
 } from "../controller/providerController.js";
const router = express.Router();
router.get("/:id", getProvider);
// router.put("/:id", updateProvider);
// router.post("/", createProvider);
// router.get("/:id/current-residences", getCurrentResidences);
// router.post("/:id/favorites/:propertyId", addFavoriteProperty);
// router.delete("/:id/favorites/:propertyId", removeFavoriteProperty);
export default router;
//# sourceMappingURL=providerRoutes.js.map