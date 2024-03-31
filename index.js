import "dotenv/config";
import "./src/database/db.js";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./src/routes/auth.routes.js";
import userRoutes from "./src/routes/user.routes.js";
import clientRoutes from "./src/routes/client.routes.js";
import galleryRoutes from "./src/routes/gallery.routes.js";

const PORT = process.env.PORT || 3000;
const WHITELIST = [process.env.FRONTEND_URL, undefined];
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: function (origin, callback) {
            if (WHITELIST.includes(origin)) {
                return callback(null, true);
            }

            return callback(new Error("Error de CORS"));
        },
    })
);

app.use("/api/uploads", express.static("src/uploads"));
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/gallery", galleryRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
