import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const createUser = async (req, res) => {
    const { username, password, roles } = req.body;

    try {
        const userFound = await User.findOne({ username });
        if (userFound)
            return res
                .status(400)
                .json({ message: "El nombre de usuario ya existe" });

        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            password: passwordHash,
            roles,
        });

        const userSaved = await newUser.save();

        res.status(201).json(userSaved);
    } catch (e) {
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const getUsers = async (req, res) => {
    const { limit, page } = req.query;
    const filters = {
        limit: parseInt(limit, 10) || 10,
        page: parseInt(page, 10) || 1,
    };

    const users = await User.paginate({}, filters);

    res.status(200).json(users);
};

export const getUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        if (!user)
            return res.status(400).json({ message: "Usuario no encontrado" });

        res.status(200).json(user);
    } catch (e) {
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { password } = req.body;

    try {
        let updatedUser = { ...req.body };

        if (password) {
            const passwordHash = await bcrypt.hash(password, 10);
            updatedUser.password = passwordHash;
        }

        const user = await User.findByIdAndUpdate(id, updatedUser, {
            new: true,
        });
        if (!user)
            return res.status(400).json({ message: "Usuario no encontrado" });

        res.status(200).json(user);
    } catch (e) {
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByIdAndDelete(id);

        if (!user)
            return res.status(404).json({ message: "Usuario no encontrado" });

        return res.sendStatus(204);
    } catch (e) {
        res.status(500).json({ message: "Error interno del servidor" });
    }
};
