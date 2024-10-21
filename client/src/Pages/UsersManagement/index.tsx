import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import CreateUser from "./components/CreateUserModal";
import UsersTable from "./components/UsersTable";

const UsersManagement = () => {
  return (
    <section>
      <header className="flex w-full justify-between items-center mb-5">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Users
            size={20}
            fontWeight={700}
            className="inline-block text-gray-500"
          />
          Users
        </h2>

        <div>
          <CreateUser>
            {({ onOpen }) => <Button onClick={onOpen}>Create new user</Button>}
          </CreateUser>
        </div>
      </header>

      <main>
        <UsersTable />
      </main>
    </section>
  );
};

export default UsersManagement;
