import PageHeader from "@/components/PageHeader";
import { useRef } from "react";
import UsersTable from "./components/UsersTable";

const Users = () => {
  const actionContainerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="grid grid-rows-[auto,1fr] gap-5">
      <PageHeader
        title="Users"
        description={"Here's a list of users in the system."}
        actionContainerRef={actionContainerRef}
      />

      <main className="overflow-y-auto scrollbar-hidden px-6">
        <UsersTable actionContainerRef={actionContainerRef} />
      </main>
    </section>
  );
};

export default Users;
