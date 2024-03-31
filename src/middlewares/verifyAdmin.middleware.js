export const validateRoles = (req, res, next) => {
    if (req.user.roles.includes("SUPERADMIN")) {
        next();
    } else {
        return res.status(401).json({ message: "No estás autorizado" });
    }
};
