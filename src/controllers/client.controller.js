import Client from "../models/client.model.js";

export const getAllClients = async (req, res) => {
    const { q, category, limit, page } = req.query;
    const filters = {
        limit: parseInt(limit, 10) || 10,
        page: parseInt(page, 10) || 1,
        sort: { createdAt: -1 },
        populate: { path: "pdfs", options: { sort: { updatedAt: -1 } } },
    };

    const query = {};

    if (category) {
        query.category = { $eq: category };
    }

    if (q) {
        query.client_name = { $regex: q, $options: "i" };
    }

    try {
        const clients = await Client.paginate(query, filters);

        res.status(200).json(clients);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

export const getClient = async (req, res) => {
    const { id } = req.params;

    try {
        const client = await Client.findById(id);
        if (!client)
            return res.status(400).json({ message: "Cliente no encontrado" });

        res.status(200).json(client);
    } catch (e) {
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const createClient = async (req, res) => {
    const { client_name, category } = req.body;

    try {
        const clientFound = await Client.findOne({ client_name });
        if (clientFound)
            return res.status(400).json({ message: "El cliente ya existe" });

        const client = new Client({
            client_name,
            category,
            user: req.user.uid,
        });

        const newClient = await client.save();

        res.status(201).json({ client: newClient });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

export const updateClient = async (req, res) => {
    const { id } = req.params;

    try {
        let client = await Client.findById(id);
        if (!client)
            return res.status(404).json({ message: "Cliente no encontrado" });

        if (!req.user.roles.includes("SUPERADMIN")) {
            if (!client.user.equals(req.user.uid))
                return res.status(401).json({ message: "No estás autorizado" });
        }

        client = await Client.findByIdAndUpdate(id, req.body, {
            new: true,
        });

        res.status(200).json(client);
    } catch (e) {
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const deleteClient = async (req, res) => {
    const { id } = req.params;

    try {
        let client = await Client.findById(id);
        if (!client)
            return res.status(404).json({ message: "Cliente no encontrado" });

        if (!req.user.roles.includes("SUPERADMIN")) {
            if (!client.user.equals(req.user.uid))
                return res.status(401).json({ message: "No estás autorizado" });
        }

        client = await Client.findByIdAndDelete(id);

        res.sendStatus(204);
    } catch (e) {
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};
