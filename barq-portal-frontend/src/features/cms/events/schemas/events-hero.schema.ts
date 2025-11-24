import { z } from "zod";
import { createI18nFieldSchema } from "@/shared/schemas/i18n.schema";

export const eventsHeroSchema = z.object({
  title: createI18nFieldSchema(
    z.string().min(5, "Title must be at least 5 characters").max(50, "Title must be at most 50 characters")
  ),
  subTitle: createI18nFieldSchema(
    z.string().min(150, "Subtitle must be at least 150 characters").max(500, "Subtitle must be at most 500 characters")
  ),
  quote: createI18nFieldSchema(
    z.string().min(10, "Quote must be at least 10 characters").max(300, "Quote must be at most 300 characters")
  ),
});

export type EventsHeroFormValues = z.infer<typeof eventsHeroSchema>;

