import { DefinedUseQueryResult, useQuery } from "@tanstack/react-query";
import React, { createContext, useContext, useRef } from "react";
import { getQuestionCategories, getQuestions } from "../api";

type TQuestionsContext = {
  questionsQuery: DefinedUseQueryResult<TQuestion[]>;
  questionCategoriesQuery: DefinedUseQueryResult<TQuestionCategory[]>;
  actionContainerRef: React.RefObject<HTMLDivElement>;
};

const QuestionsContext = createContext<TQuestionsContext | undefined>(
  undefined
);

const QuestionsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const actionContainerRef = useRef<HTMLDivElement>(null);

  const questionsQuery = useQuery({
    queryKey: ["questions"],
    queryFn: getQuestions,
    initialData: [],
  });

  const questionCategoriesQuery = useQuery({
    queryKey: ["questionCategories"],
    queryFn: getQuestionCategories,
    initialData: [],
    select(data) {
      return data.sort((a, b) => a.category.localeCompare(b.category));
    },
  });

  return (
    <QuestionsContext.Provider
      value={{
        questionsQuery,
        questionCategoriesQuery,
        actionContainerRef,
      }}
    >
      {children}
    </QuestionsContext.Provider>
  );
};

export default QuestionsProvider;

export const useQuestionsContext = () => {
  const context = useContext(QuestionsContext);

  if (context === undefined) {
    throw new Error("useQuestions must be within Questions");
  }
  return context;
};
