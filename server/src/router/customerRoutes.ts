import express from "express";
import { login, register } from "../controller/authController.js";
import {
  getCustomer,
  // createCustomer,
  // updateCustomer,
  // getCurrentResidences,
  // addFavoriteProperty,
  // removeFavoriteProperty,
} from "../controller/customerController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/:id", getCustomer);
// router.put("/:id", updateCustomer);
// router.post("/", createCustomer);
// router.get("/:id/current-residences", getCurrentResidences);
// router.post("/:id/favorites/:propertyId", addFavoriteProperty);
// router.delete("/:id/favorites/:propertyId", removeFavoriteProperty);

export default router;
