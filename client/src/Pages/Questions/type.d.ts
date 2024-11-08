type TQuestion = import("zod").infer<typeof import("./schema").QuestionSchema>;

type TQuestionCategory = import("zod").infer<
  typeof import("./schema").QuestionCategorySchema
>;
