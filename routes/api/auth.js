import express from "express";
import { validateBody } from "../../middlewares/validateBody.js";
import {schemas} from "../../models/user.js";
import ctrl from "../../controllers/auth.js";

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

export default router;
