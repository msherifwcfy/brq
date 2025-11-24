import { z } from "zod";
import { createI18nFieldSchema } from "@/shared/schemas/i18n.schema";
import { documentSchema } from "@/shared/schemas/file.schema";

const bulletPointSchema = z.object({
  title: createI18nFieldSchema(
    z
      .string()
      .min(5, "Title must be at least 5 characters")
      .max(50, "Title must be at most 50 characters")
  ),
  icon: z
    .array(documentSchema)
    .min(1, "Icon is required")
    .max(1, "Only one icon is allowed")
});

export const createDataCenterSchema = z.object({
  title: createI18nFieldSchema(
    z
      .string()
      .min(90, "Text must be at least 90 characters")
      .max(150, "Text must be at most 150 characters")
  ),
  image: z
    .array(documentSchema)
    .min(1, "Image is required")
    .max(1, "Only one image is allowed"),
  bulletPoints: z.array(bulletPointSchema).min(2, "At least 2 bullet points").max(6, "At most 6 bullet points").optional(),
});

export type CreateDataCenterFormData = z.infer<typeof createDataCenterSchema>;
