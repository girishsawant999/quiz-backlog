import * as z from "zod";

export const OptionSchema = z.object({
  optionId: z.string(),
  optionValue: z.string(),
  _id: z.string(),
});

export const QUESTION_DIFFICULTIES = {
  EASY: "Easy",
  MEDIUM: "Medium",
  HARD: "Hard",
};

export const QuestionSchema = z.object({
  title: z.string(),
  description: z.string(),
  options: z.array(OptionSchema),
  correctOption: z.string(),
  difficulty: z.enum(["Easy", "Medium", "Hard"]),
  category: z.object({
    _id: z.string(),
    category: z.string(),
    description: z.string(),
    isActive: z.boolean(),
    isDeleted: z.boolean(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
  }),
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

export const QuestionCategorySchema = z.object({
  category: z.string(),
  description: z.string(),
  _id: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const QuestionsResponseSchema = z.object({
  questions: z.array(QuestionSchema),
  totalQuestions: z.number(),
  totalPages: z.number(),
  currentPage: z.number(),
});
