import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { validateToken } from "../middlewares/validateToken.middleware.js";
import { validateRoles } from "../middlewares/verifyAdmin.middleware.js";
import { userSchema } from "../schemas/user.schema.js";
import {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
} from "../controllers/user.controller.js";

const router = Router();

router.get("/", validateToken, validateRoles, getUsers);
router.get("/:id", validateToken, validateRoles, getUser);
router.post(
    "/",
    validateToken,
    validateRoles,
    validateSchema(userSchema),
    createUser
);
router.put("/:id", validateToken, validateRoles, updateUser);
router.delete("/:id", validateToken, validateRoles, deleteUser);

export default router;
