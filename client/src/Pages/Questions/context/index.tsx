import { DefinedUseQueryResult, useQuery } from "@tanstack/react-query";
import React, { createContext, useContext, useRef } from "react";
import { getQuestionCategories } from "../api";

type TQuestionsContext = {
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
