import QuestionForm from "./components/QuestionForm";
import QuestionsTable from "./components/QuestionsTable";

export const QUESTIONS_ROUTES: {
  path: string;
  element: JSX.Element;
}[] = [
  {
    path: "/:questionId/:mode",
    element: <QuestionForm />,
  },
  {
    path: "/new",
    element: <QuestionForm />,
  },
  {
    path: "/*",
    element: <QuestionsTable />,
  },
];
