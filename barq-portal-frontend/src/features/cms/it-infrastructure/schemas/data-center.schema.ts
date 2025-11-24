import { z } from "zod";
import { createI18nFieldSchema } from "@/shared/schemas/i18n.schema";
import { documentSchema } from "@/shared/schemas/file.schema";

const bulletPointSchema = z.object({
  title: createI18nFieldSchema(
    z
      .string()
      .min(3, "Title must be at least 3 characters")
      .max(100, "Title must be at most 100 characters")
  ),
  icon: z.array(documentSchema).max(1).optional(),
});

export const createDataCenterSchema = z.object({
  title: createI18nFieldSchema(
    z
      .string()
      .min(10, "Title must be at least 10 characters")
      .max(100, "Title must be at most 100 characters")
  ),
  image: z.array(documentSchema).max(1, "Only one image is allowed").optional(),
  bulletPoints: z.array(bulletPointSchema).optional(),
});

export type CreateDataCenterFormData = z.infer<typeof createDataCenterSchema>;
