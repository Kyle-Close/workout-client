import * as z from "zod";

export const UserWeightEntrySchema = z.object({
  id: z.number(),
  user_id: z.number().optional(),
  weight: z.number(),
  date: z.string(),
});

export const UserWeightListSchema = z.array(UserWeightEntrySchema);

export type UserWeightEntry = z.infer<typeof UserWeightEntrySchema>;
