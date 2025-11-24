import { z } from "zod";
import { createI18nFieldSchema } from "@/shared/schemas/i18n.schema";

export const createAboutUsMissionVisionSchema = z.object({
  section_title: createI18nFieldSchema(
    z.string()
      .min(5, "Section title must be at least 5 characters")
      .max(35, "Section title must not exceed 35 characters")
  ),
  mission_title: createI18nFieldSchema(
    z.string()
      .min(1, "Mission title is required")
      .refine(() => true, "Mission title is static")
  ),
  mission_description: createI18nFieldSchema(
    z.string()
      .min(150, "Mission description must be at least 150 characters")
      .max(350, "Mission description must not exceed 350 characters")
  ),
  vision_title: createI18nFieldSchema(
    z.string()
      .min(1, "Vision title is required")
      .refine(() => true, "Vision title is static")
  ),
  vision_description: createI18nFieldSchema(
    z.string()
      .min(150, "Vision description must be at least 150 characters")
      .max(350, "Vision description must not exceed 350 characters")
  ),
});

export const updateAboutUsMissionVisionSchema = z.object({
  section_title: createI18nFieldSchema(
    z.string()
      .min(5, "Section title must be at least 5 characters")
      .max(35, "Section title must not exceed 35 characters")
  ).optional(),
  mission_title: createI18nFieldSchema(
    z.string()
      .min(1, "Mission title is required")
      .refine(() => true, "Mission title is static")
  ).optional(),
  mission_description: createI18nFieldSchema(
    z.string()
      .min(150, "Mission description must be at least 150 characters")
      .max(350, "Mission description must not exceed 350 characters")
  ).optional(),
  vision_title: createI18nFieldSchema(
    z.string()
      .min(1, "Vision title is required")
      .refine(() => true, "Vision title is static")
  ).optional(),
  vision_description: createI18nFieldSchema(
    z.string()
      .min(150, "Vision description must be at least 150 characters")
      .max(350, "Vision description must not exceed 350 characters")
  ).optional(),
});

export type CreateAboutUsMissionVisionFormData = z.infer<typeof createAboutUsMissionVisionSchema>;
export type UpdateAboutUsMissionVisionFormData = z.infer<typeof updateAboutUsMissionVisionSchema>;
