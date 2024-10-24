import * as z from "zod";

export const OptionSchema = z.object({
  optionId: z.string(),
  optionValue: z.string(),
  _id: z.string(),
});

export const QuestionSchema = z.object({
  title: z.string(),
  description: z.string(),
  options: z.array(OptionSchema),
  correctOption: z.string(),
  difficulty: z.string(),
  category: z.string(),
  isVerified: z.boolean(),
  verifiedBy: z.null(),
  isPractice: z.boolean(),
  isActive: z.boolean(),
  createdAtOn: z.coerce.date(),
  lastUsedOn: z.null(),
  isDeleted: z.boolean(),
  _id: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
