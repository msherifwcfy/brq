import { z } from "zod";
import { createI18nFieldSchema } from "@/shared/schemas/i18n.schema";

const leadershipCardSchema = z.object({
  name: createI18nFieldSchema(
    z.string().min(5, "Name must be at least 5 characters").max(30, "Name must not exceed 30 characters")
  ),
  role: createI18nFieldSchema(
    z.string().min(10, "Role must be at least 10 characters")
  ),
  bio: createI18nFieldSchema(
    z.string().min(400, "Bio must be at least 400 characters").max(1000, "Bio must not exceed 1000 characters")
  ),
  image: z
    .array(
      z.object({
        id: z.number(),
        url: z.string(),
        key: z.string().optional(),
        name: z.string().optional(),
        format: z.string().optional(),
        mime_type: z.string().optional(),
        size: z.number().optional(),
      })
    )
    .min(1, "Image is required"),
});

export const createLeadershipTeamSchema = z.object({
  title: createI18nFieldSchema(
    z.string().min(15, "Title must be at least 15 characters").max(50, "Title must not exceed 50 characters")
  ),
  description: createI18nFieldSchema(
    z.string().min(70, "Description must be at least 70 characters").max(200, "Description must not exceed 200 characters")
  ),
  cards: z
    .array(leadershipCardSchema)
    .min(1, "At least 1 card is required")
    .max(18, "Maximum 18 cards allowed (3 rows × 6 cards)"),
});

export const updateLeadershipTeamSchema = z.object({
  title: createI18nFieldSchema(
    z.string().min(15, "Title must be at least 15 characters").max(50, "Title must not exceed 50 characters")
  ).optional(),
  description: createI18nFieldSchema(
    z.string().min(70, "Description must be at least 70 characters").max(200, "Description must not exceed 200 characters")
  ).optional(),
  cards: z
    .array(leadershipCardSchema.extend({ id: z.number().optional() }))
    .min(1, "At least 1 card is required")
    .max(18, "Maximum 18 cards allowed (3 rows × 6 cards)")
    .optional(),
});

export type CreateLeadershipTeamFormData = z.infer<typeof createLeadershipTeamSchema>;
export type UpdateLeadershipTeamFormData = z.infer<typeof updateLeadershipTeamSchema>;
export type LeadershipCardFormData = z.infer<typeof leadershipCardSchema>;

