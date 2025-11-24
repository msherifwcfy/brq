import { z } from "zod";
import { createI18nFieldSchema } from "@/shared/schemas/i18n.schema";

export const successStoryHeroSchema = z.object({
  title: createI18nFieldSchema(
    z.string().min(15, "Title must be at least 15 characters").max(150, "Title must be at most 150 characters")
  ),
  subTitle: createI18nFieldSchema(
    z.string().min(30, "Description must be at least 30 characters").max(350, "Description must be at most 350 characters")
  ),
});

export type SuccessStoryHeroFormValues = z.infer<typeof successStoryHeroSchema>;


