import Gallery from "../models/gallery.model.js";
import Client from "../models/client.model.js";
import fs from "fs/promises";
import path from "path";

export const getAllFiles = async (req, res) => {
    const { userId } = req.params;
    const { limit, page } = req.query;
    const filters = {
        limit: parseInt(limit, 10) || 10,
        page: parseInt(page, 10) || 1,
        sort: { createdAt: -1 },
    };

    try {
        const files = await Gallery.paginate({ client: userId }, filters);

        res.json(files);
    } catch (e) {
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const getFile = async (req, res) => {
    const { id } = req.params;

    try {
        const file = await Gallery.findById(id).populate({
            path: "client",
            options: { select: "client_name" },
        });
        if (!file)
            return res.status(400).json({ message: "PDF no encontrado" });

        res.json(file);
    } catch (e) {
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const createFile = async (req, res) => {
    const { client } = req.body;

    try {
        const clientFound = await Client.findOne({
            client_name: client,
        });
        if (!clientFound)
            return res.status(400).json({ message: "El cliente no existe" });

        const PDF = new Gallery({
            pdf: `/${req.file.filename}`,
            user: req.user.uid,
            client: clientFound._id,
        });

        const savedPDF = await PDF.save();

        await clientFound.updateOne({
            $push: {
                pdfs: savedPDF._id,
            },
        });

        res.status(201).json(savedPDF);
    } catch (e) {
        return res.status(400).json({ message: "Error interno del servidor" });
    }
};

export const updateFile = async (req, res) => {
    const { id } = req.params;
    const newPDF = {};

    try {
        const fileFound = await Gallery.findById(id);
        if (!fileFound)
            return res.status(400).json({ message: "El PDF no existe" });

        if (!req.user.roles.includes("SUPERADMIN")) {
            if (!fileFound.user.equals(req.user.uid))
                return res.status(401).json({ message: "No estás autorizado" });
        }

        if (req.file) {
            newPDF.pdf = `/${req.file.filename}`;
            await fs.unlink(path.join("src/uploads") + fileFound.pdf);
        }

        const savedFile = await Gallery.findByIdAndUpdate(
            id,
            {
                pdf: newPDF.pdf,
            },
            {
                new: true,
            }
        );

        res.status(200).json(savedFile);
    } catch (e) {
        return res.status(400).json({ message: "Error interno del servidor" });
    }
};

export const deleteFile = async (req, res) => {
    const { id } = req.params;

    try {
        const fileFound = await Gallery.findById(id);
        if (!fileFound)
            return res.status(200).json({ message: "El PDF no existe" });

        if (!req.user.roles.includes("SUPERADMIN")) {
            if (!fileFound.user.equals(req.user.uid))
                return res.status(401).json({ message: "No estás autorizado" });
        }

        await fs.unlink(path.join("src/uploads") + fileFound.pdf);
        await Client.findOneAndUpdate(
            { pdfs: { $in: id } },
            {
                $pull: {
                    pdfs: id,
                },
            }
        );
        await fileFound.deleteOne();

        res.sendStatus(204);
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};
