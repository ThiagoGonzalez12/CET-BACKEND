import { z } from "zod";

const VALUES = ["ADMIN", "SUPERADMIN"];

export const userSchema = z.object({
    username: z
        .string({
            required_error: "El nombre de usuario es requerido",
        })
        .min(4, {
            message: "El nombre de usuario debe tener al menos 4 caracteres",
        })
        .max(40, {
            message: "El nombre de usuario debe tener máximo 40 caracteres",
        }),
    password: z
        .string({
            required_error: "La contraseña es requerida",
        })
        .min(4, {
            message: "La contraseña debe tener al menos 4 caracteres",
        })
        .max(40, {
            message: "La contraseña debe tener máximo 40 caracteres",
        }),
    roles: z
        .array(
            z.enum(VALUES, {
                errorMap: (issue, ctx) => ({ message: "Rol invalido" }),
            }),
            {
                required_error: "El rol es requerido",
            }
        )
        .min(1, {
            message: "El rol debe tener al menos 1 valor",
        })
        .nonempty(),
});
