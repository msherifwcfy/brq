import { z } from "zod";
import { createI18nFieldSchema, createOptionalI18nFieldSchema } from "@/shared/schemas/i18n.schema";

const mediaSchema = z.array(
  z.object({
    id: z.number(),
    url: z.string(),
    key: z.string(),
    name: z.string().optional(),
    format: z.string(),
    mime_type: z.string(),
    size: z.number(),
  })
);

export const eventSchema = z.object({
  title: createI18nFieldSchema(z.string().min(1, "Title is required")),
  subtitle: createOptionalI18nFieldSchema(z.string()),
  overview: createOptionalI18nFieldSchema(z.string()),
  eventDate: z.date(),
  venueName: createOptionalI18nFieldSchema(z.string()),
  venueAddress: createOptionalI18nFieldSchema(z.string()),
  googleMapsLink: z.string().url().optional().or(z.literal("")),
  heroImage: mediaSchema.optional(),
  isPublished: z.boolean(),
  displayOrder: z.number(),
});

export const agendaItemSchema = z.object({
  timeSlot: z.string().min(1, "Time slot is required"),
  description: createI18nFieldSchema(z.string().min(1, "Description is required")),
  displayOrder: z.number(),
});

export const speakerSchema = z.object({
  name: createI18nFieldSchema(z.string().min(1, "Name is required")),
  title: createI18nFieldSchema(z.string().min(1, "Title is required")),
  bio: createOptionalI18nFieldSchema(z.string()),
  image: mediaSchema.optional(),
  displayOrder: z.number(),
});

export const partnerSchema = z.object({
  name: createI18nFieldSchema(z.string().min(1, "Name is required")),
  logo: mediaSchema.optional(),
  websiteUrl: z.string().url().optional().or(z.literal("")),
  displayOrder: z.number(),
});

export type EventFormData = z.infer<typeof eventSchema>;
export type AgendaItemFormData = z.infer<typeof agendaItemSchema>;
export type SpeakerFormData = z.infer<typeof speakerSchema>;
export type PartnerFormData = z.infer<typeof partnerSchema>;
