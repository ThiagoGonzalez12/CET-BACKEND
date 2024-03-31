import { Router } from "express";
import {
    login,
    isUserAuthenticated,
    isAdmin,
} from "../controllers/auth.controller.js";
import { validateToken } from "../middlewares/validateToken.middleware.js";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";

const router = Router();

router.post("/login", login);
router.post("/register", async (req, res) => {
    const { username, password, roles } = req.body;

    const hash = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, hash);

    const user = new User({
        username,
        password: passwordHash,
        roles,
    });

    await user.save()
});
router.get("/user", validateToken, isUserAuthenticated);
router.get("/admin", validateToken, isAdmin);

export default router;