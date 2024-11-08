import PageHeader from "@/components/PageHeader";
import { Route, Routes } from "react-router-dom";
import QuestionsProvider, { useQuestionsContext } from "./context";
import { QUESTIONS_ROUTES } from "./routes";

const Header = () => {
  const { actionContainerRef } = useQuestionsContext();

  return (
    <PageHeader
      title="Questions"
      description={"Here's a list of questions in the system."}
      actionContainerRef={actionContainerRef}
    />
  );
};

const Questions = () => {
  return (
    <QuestionsProvider>
      <section className="grid gap-5 grid-rows-[auto,1fr] overflow-hidden">
        <Header />
        <main className="overflow-y-auto scrollbar-hidden px-6">
          <Routes>
            {QUESTIONS_ROUTES.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Routes>
        </main>
      </section>
    </QuestionsProvider>
  );
};

export default Questions;
