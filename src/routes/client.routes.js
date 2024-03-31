import { Router } from "express";
import { validateToken } from "../middlewares/validateToken.middleware.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { clientSchema } from "../schemas/client.schema.js";
import {
    getAllClients,
    getClient,
    createClient,
    updateClient,
    deleteClient,
} from "../controllers/client.controller.js";

const router = Router();

router.get("/", validateToken, getAllClients);
router.get("/:id", validateToken, getClient);
router.post("/", validateToken, validateSchema(clientSchema), createClient);
router.put("/:id", validateToken, updateClient);
router.delete("/:id", validateToken, deleteClient);

export default router;
