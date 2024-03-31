import { Router } from "express";
import { validateToken } from "../middlewares/validateToken.middleware.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { PDFSchema } from "../schemas/gallery.schema.js";
import { upload } from "../middlewares/multer.middleware.js";
import {
    getAllFiles,
    getFile,
    createFile,
    updateFile,
    deleteFile,
} from "../controllers/gallery.controller.js";

const router = Router();

router.get("/:userId", validateToken, getAllFiles);
router.get("/pdf/:id", validateToken, getFile);
router.post(
    "/",
    validateToken,
    upload.single("PDF"),
    validateSchema(PDFSchema),
    createFile
);
router.put("/:id", validateToken, upload.single("PDF"), updateFile);
router.delete("/:id", validateToken, deleteFile);

export default router;
