import PageHeader from "@/components/PageHeader";
import { useRef } from "react";
import UsersTable from "./components/UsersTable";

const Users = () => {
  const actionContainerRef = useRef<HTMLDivElement>(null);

  return (
    <section>
      <PageHeader
        title="Users"
        description={"Here's a list of users in the system."}
        actionContainerRef={actionContainerRef}
      />

      <main>
        <UsersTable actionContainerRef={actionContainerRef} />
      </main>
    </section>
  );
};

export default Users;
