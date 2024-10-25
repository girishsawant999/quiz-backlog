import PageHeader from "@/components/PageHeader";
import { useRef } from "react";
import UsersTable from "./components/UsersTable";

const Users = () => {
  const actionContainerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="grid gap-5 grid-rows-[auto,1fr]">
      <PageHeader
        title="Users"
        description={"Here's a list of users in the system."}
        actionContainerRef={actionContainerRef}
      />

      <main className="overflow-y-auto scrollbar-hidden">
        <UsersTable actionContainerRef={actionContainerRef} />
      </main>
    </section>
  );
};

export default Users;
