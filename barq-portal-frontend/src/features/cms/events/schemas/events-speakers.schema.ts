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

const speakerCardSchema = z.object({
  id: z.number().optional(),
  name: createI18nFieldSchema(
    z.string().min(2, "Name must be at least 2 characters").max(30, "Name must be at most 30 characters")
  ),
  role: createI18nFieldSchema(
    z.string().min(10, "Role must be at least 10 characters").max(80, "Role must be at most 80 characters")
  ),
  image: z
    .array(mediaSchema)
    .min(1, "Speaker image is required")
    .max(1, "Only one speaker image is allowed"),
});

export const createEventsSpeakersSchema = z.object({
  title: createI18nFieldSchema(
    z.string().min(10, "Title must be at least 10 characters").max(50, "Title must be at most 50 characters")
  ),
  cards: z
    .array(speakerCardSchema)
    .min(1, "At least one speaker is required")
    .max(8, "A maximum of eight speakers is allowed"),
});

export const updateEventsSpeakersSchema = createEventsSpeakersSchema.partial();

export type CreateEventsSpeakersFormValues = z.infer<typeof createEventsSpeakersSchema>;
export type UpdateEventsSpeakersFormValues = z.infer<typeof updateEventsSpeakersSchema>;

