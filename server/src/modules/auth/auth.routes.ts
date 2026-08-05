import { Router } from "express";
import { AuthController } from "./auth.controller";

const router = Router();
const controller = new AuthController();

console.log("✅ Auth routes loaded");

router.post("/register", controller.register);
router.post("/login", controller.login);

export default router;