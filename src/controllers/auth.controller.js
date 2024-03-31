import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.lib.js";

export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user)
            return res.status(400).json({ message: "Usuario no encontrado" });

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch)
            return res.status(400).json({ message: "Credenciales inválidas" });

        const token = await createAccessToken({
            uid: user._id,
            roles: user.roles,
        });

        res.cookie("token", token);

        res.json({ token });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

export const isUserAuthenticated = async (req, res) => {
    const { user } = req;

    res.json(user);
};

export const isAdmin = async (req, res) => {
    const { user } = req;

    if (!user.roles.includes("SUPERADMIN"))
        return res.status(403).json({
            message: "No estás autorizado, hable con el administrador.",
        });

    res.json(user);
};
