import jwt from "jsonwebtoken";

export const validateToken = (req, res, next) => {
    try {
        let token = req.headers?.authorization;
        if (!token)
            return res.status(400).json({ message: "No existe el token" });

        token = token.split(" ")[1];

        const { uid, roles } = jwt.verify(token, process.env.SECRET_KEY);

        req.user = {
            uid,
            roles,
        };

        next();
    } catch (e) {
        return res.status(400).json({ message: e.message });
    }
};
