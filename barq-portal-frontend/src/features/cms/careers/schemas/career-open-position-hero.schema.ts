import { z } from "zod";
import { createI18nFieldSchema } from "@/shared/schemas/i18n.schema";

export const careerOpenPositionHeroSchema = z.object({
  title: createI18nFieldSchema(
    z.string()
      .min(5, "Title must be at least 5 characters")
      .max(50, "Title must not exceed 50 characters")
  ),
  // description: createI18nFieldSchema(
  //   z.string()
  //     .min(50, "Subtext must be at least 50 characters")
  //     .max(250, "Subtext must not exceed 250 characters")
  // ),
});

export type CareerOpenPositionHeroFormData = z.infer<typeof careerOpenPositionHeroSchema>;

