import multer from "multer";
import fs from "fs";

export const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            const path = `./src/uploads/`;
            fs.mkdirSync(path, { recursive: true });
            cb(null, path);
        },
        filename: (req, file, cb) => {
            cb(null, `${crypto.randomUUID()}.${file.mimetype.split("/")[1]}`);
        },
    }),
    fileFilter: (req, file, cb) => {
        const ACCEPTED_IMAGE_TYPES = ["application/pdf"];

        if (!ACCEPTED_IMAGE_TYPES.includes(file.mimetype)) {
            return cb(null, false);
        }

        cb(null, true);
    },
});
