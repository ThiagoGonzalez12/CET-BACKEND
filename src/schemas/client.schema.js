import { z } from "zod";

export const clientSchema = z.object({
    client_name: z.string({
        required_error: "El nombre del cliente es requerido",
    }),
    category: z.string({
        required_error: "La categoria del cliente es requerida",
    }),
});
