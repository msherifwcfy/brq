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

export const campaignSchema = z.object({
  campaignType: z.enum(["campaign1", "campaign2", "campaign3"]),
  title: createI18nFieldSchema(z.string().min(1, "Title is required")),
  subtitle: createOptionalI18nFieldSchema(z.string()),
  description: createOptionalI18nFieldSchema(z.string()),
  heroImage: mediaSchema.optional(),
  heroVideo: z.string().url().optional().or(z.literal("")),
  contentImage: mediaSchema.optional(),
  ctaText: createOptionalI18nFieldSchema(z.string()),
  isPublished: z.boolean(),
  displayOrder: z.number(),
});

export const campaignFeatureSchema = z.object({
  title: createI18nFieldSchema(z.string().min(1, "Title is required")),
  icon: mediaSchema.optional(),
  displayOrder: z.number(),
});

export type CampaignFormData = z.infer<typeof campaignSchema>;
export type CampaignFeatureFormData = z.infer<typeof campaignFeatureSchema>;
