import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Users } from "lucide-react";
import { getUsers } from "./api";
import CreateUser from "./components/CreateUserModal";

const UsersManagement = () => {
  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
  console.log("data", data);

  return (
    <section>
      <header className="flex w-full justify-between items-center">
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
    </section>
  );
};

export default UsersManagement;
