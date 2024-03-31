import jwt from "jsonwebtoken";

export const createAccessToken = async (payload) => {
    try {
        const token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: "30d",
        });

        return token;
    } catch (e) {
        console.log(e);
    }
};
