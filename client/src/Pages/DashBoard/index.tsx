import PageHeader from "@/components/PageHeader";

const DashBoard = () => {
  return (
    <section className="grid grid-rows-[auto,1fr]">
      <PageHeader title="Dashboard" description={"Quiz backlog dashboard"} />

      <main className="overflow-y-auto scrollbar-hidden px-6">DashBoard</main>
    </section>
  );
};

export default DashBoard;
