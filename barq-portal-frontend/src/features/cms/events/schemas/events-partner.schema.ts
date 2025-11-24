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

export const createEventsPartnerSchema = z.object({
  title: createI18nFieldSchema(
    z.string().min(10, "Title must be at least 10 characters").max(50, "Title must be at most 50 characters")
  ),
  subTitle: createI18nFieldSchema(
    z.string().min(50, "Text must be at least 50 characters").max(250, "Text must be at most 250 characters")
  ),
  logos: z
    .array(mediaSchema)
    .min(1, "At least one partner logo is required")
    .max(12, "A maximum of twelve partner logos is allowed"),
});

export const updateEventsPartnerSchema = createEventsPartnerSchema.partial();

export type CreateEventsPartnerFormValues = z.infer<typeof createEventsPartnerSchema>;
export type UpdateEventsPartnerFormValues = z.infer<typeof updateEventsPartnerSchema>;

