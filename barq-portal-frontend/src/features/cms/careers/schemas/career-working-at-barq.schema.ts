import { z } from "zod";
import { createI18nFieldSchema } from "@/shared/schemas/i18n.schema";

const mediaSchema = z.object({
  id: z.number(),
  url: z.string(),
  key: z.string().optional(),
  name: z.string().optional(),
  format: z.string().optional(),
  mime_type: z.string().optional(),
  size: z.number().optional(),
});

const workingAtBarqCardSchema = z.object({
  title: createI18nFieldSchema(
    z.string().min(5, "Title must be at least 5 characters").max(50, "Title must not exceed 50 characters")
  ),
  sub_title: createI18nFieldSchema(
    z.string().min(50, "Card text must be at least 50 characters").max(150, "Card text must not exceed 150 characters")
  ),
  icon: z
    .array(mediaSchema)
    .min(1, "Icon is required"),
});

export const createCareerWorkingAtBarqSchema = z.object({
  title: createI18nFieldSchema(
    z.string().min(15, "Title must be at least 15 characters").max(50, "Title must not exceed 50 characters")
  ),
  sub_title: createI18nFieldSchema(
    z.string().min(50, "Subtext must be at least 50 characters").max(250, "Subtext must not exceed 250 characters")
  ),
  cards: z
    .array(workingAtBarqCardSchema)
    .min(2, "At least 2 cards are required (minimum 1 row with 2 cards)")
    .max(6, "Maximum 6 cards allowed (maximum 2 rows with 3 cards per row)"),
});

export const updateCareerWorkingAtBarqSchema = z.object({
  title: createI18nFieldSchema(
    z.string().min(15, "Title must be at least 15 characters").max(50, "Title must not exceed 50 characters")
  ).optional(),
  sub_title: createI18nFieldSchema(
    z.string().min(50, "Subtext must be at least 50 characters").max(250, "Subtext must not exceed 250 characters")
  ).optional(),
  cards: z
    .array(workingAtBarqCardSchema.extend({ id: z.number().optional() }))
    .min(2, "At least 2 cards are required (minimum 1 row with 2 cards)")
    .max(6, "Maximum 6 cards allowed (maximum 2 rows with 3 cards per row)")
    .optional(),
});

export type CreateCareerWorkingAtBarqFormData = z.infer<typeof createCareerWorkingAtBarqSchema>;
export type UpdateCareerWorkingAtBarqFormData = z.infer<typeof updateCareerWorkingAtBarqSchema>;
export type WorkingAtBarqCardFormData = z.infer<typeof workingAtBarqCardSchema>;

