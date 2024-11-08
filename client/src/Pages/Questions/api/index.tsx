import { apiInstance } from "@/helpers/api";
import { z } from "zod";
import { createQuestionSchema } from "../components/QuestionForm";

export const getQuestions = async () => {
  return (
    await apiInstance.get<{ questions: TQuestion[] }>("question/getQuestions")
  ).data.questions;
};

export const getQuestion = async (_id: string) => {
  return (
    await apiInstance.get<{ question: TQuestion }>(
      `question/getQuestion?_id=${_id}`
    )
  ).data.question;
};

export const createQuestion = async (
  data: z.infer<typeof createQuestionSchema>
) => {
  return apiInstance.post("question/createQuestion", data);
};

export const updateQuestion = async (
  data: Partial<z.infer<typeof createQuestionSchema>>
) => {
  return apiInstance.post("question/updateQuestion", data);
};

export const deleteQuestion = async (_id: string) => {
  return apiInstance.post("question/deleteQuestion", { _id });
};

export const createQuestionCategory = async (data: {
  category: string;
  description: string;
}) => {
  return (
    await apiInstance.post<{
      data: {
        questionCategory: TQuestionCategory;
        message: string;
      };
    }>("questionCategory/createQuestionCategory", data)
  ).data;
};

export const getQuestionCategories = async () => {
  return (
    await apiInstance.get<{
      data: { questionCategories: TQuestionCategory[] };
    }>("questionCategory/getQuestionCategories")
  ).data.data.questionCategories;
};
