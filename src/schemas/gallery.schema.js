import { z } from "zod";

const ACCEPTED_IMAGE_TYPES = ["application/pdf"];

export const PDFSchema = z.object({
    client: z.string({
        required_error: "El cliente es requerido",
    }),
    PDF: z
        .any()
        .refine((file) => file, "Image is obligatory")
        .refine(
            (file) => ACCEPTED_IMAGE_TYPES.includes(file?.mimetype),
            "Formato no soportado"
        ),
});
