import { z } from "zod";
import { createI18nFieldSchema } from "@/shared/schemas/i18n.schema";

export const newsroomHeroSchema = z.object({
  title: createI18nFieldSchema(
    z.string().min(20, "Title must be at least 20 characters").max(90, "Title must not exceed 90 characters")
  ),
  subtitle: createI18nFieldSchema(
    z.string().min(80, "Subtitle must be at least 80 characters").max(180, "Subtitle must not exceed 180 characters")
  ),
});

export type NewsroomHeroFormData = z.infer<typeof newsroomHeroSchema>;


