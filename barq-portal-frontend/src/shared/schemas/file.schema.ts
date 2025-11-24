import { z } from "zod";

export const documentSchema = z.object({
  id: z.number(),
  url: z.string(),
  key: z.string(),
  size: z.number(),
  mime_type: z.string(),
  format: z.string(),
});

export type DocumentType = z.infer<typeof documentSchema>;
