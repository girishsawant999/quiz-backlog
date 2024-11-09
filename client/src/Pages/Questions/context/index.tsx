import useDebounce from "@/hooks/use-debounce";
import { DefinedUseQueryResult, useQuery } from "@tanstack/react-query";
import React, { createContext, useContext, useRef } from "react";
import { getQuestionCategories, getQuestions } from "../api";
import useQuestionTableReducer from "../components/QuestionsTable/reducer";

type TQuestionsContext = {
  questionsQuery: DefinedUseQueryResult<{
    questions: TQuestion[];
    totalQuestions: number;
    totalPages: number;
    currentPage: number;
  }>;
  questionCategoriesQuery: DefinedUseQueryResult<TQuestionCategory[]>;
  actionContainerRef: React.RefObject<HTMLDivElement>;
  state: ReturnType<typeof useQuestionTableReducer>[0];
  dispatch: ReturnType<typeof useQuestionTableReducer>[1];
};

const QuestionsContext = createContext<TQuestionsContext | undefined>(
  undefined
);

const QuestionsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const actionContainerRef = useRef<HTMLDivElement>(null);
  const [state, dispatch] = useQuestionTableReducer();
  const debouncedState = useDebounce(state, 500);

  const questionsQuery = useQuery({
    queryKey: ["questions", debouncedState],
    queryFn: () => getQuestions(debouncedState.page, debouncedState.search),
    initialData: {
      questions: [],
      totalPages: 1,
      totalQuestions: 0,
      currentPage: 1,
    },
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
        state,
        dispatch,
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
