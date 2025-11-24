import { z } from "zod";
import { documentSchema } from "@/shared/schemas/file.schema";

export const createHomeImagesSchema = z.object({
  image1: z.array(documentSchema).optional(),
  image2: z.array(documentSchema).optional(),
  image3: z.array(documentSchema).optional(),
});

export const updateHomeImagesSchema = z.object({
  image1: z.array(documentSchema).optional(),
  image2: z.array(documentSchema).optional(),
  image3: z.array(documentSchema).optional(),
});

export type CreateHomeImagesFormData = z.infer<typeof createHomeImagesSchema>;
export type UpdateHomeImagesFormData = z.infer<typeof updateHomeImagesSchema>;

