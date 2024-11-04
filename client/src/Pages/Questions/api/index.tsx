import { apiInstance } from "@/helpers/api";
import { z } from "zod";
import { createQuestionFormSchema } from "../components/CreateQuestionModal";

export const getQuestions = async () => {
  return (
    await apiInstance.get<{ questions: TQuestion[] }>("question/getQuestions")
  ).data.questions;
};

export const getQuestion = async (id: string) => {
  return apiInstance.get(`question/getQuestion?id=${id}`);
};

export const createQuestion = async (
  data: z.infer<typeof createQuestionFormSchema>
) => {
  return apiInstance.post("question/createQuestion", data);
};

export const updateQuestion = async (data: {
  _id: string;
  title: string;
  content: string;
  tags: string[];
}) => {
  return apiInstance.post("question/updateQuestion", data);
};

export const deleteQuestion = async (_id: string) => {
  return apiInstance.post("question/deleteQuestion", { _id });
};
