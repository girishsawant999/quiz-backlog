import PageHeader from "@/components/PageHeader";
import { useRef } from "react";
import QuestionsTable from "./components/QuestionsTable";

const Questions = () => {
  const actionContainerRef = useRef(null);

  return (
    <section className="grid gap-5 grid-rows-[auto,1fr]">
      <PageHeader
        title="Questions"
        description={"Here's a list of questions in the system."}
        actionContainerRef={actionContainerRef}
      />
      <main className="overflow-y-auto scrollbar-hidden p-6">
        <QuestionsTable actionContainerRef={actionContainerRef} />
      </main>
    </section>
  );
};

export default Questions;
