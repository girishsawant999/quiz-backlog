import UsersTable from "./components/UsersTable";

const Users = () => {
  return (
    <section>
      <header className="flex w-full justify-between items-center pb-4 border-b border-gray-200">
        <div>
          <h2 className="text-2xl font-semibold">Users</h2>
          <p className="text-muted-foreground">
            Here's a list of users in the system.
          </p>
        </div>
      </header>

      <main>
        <UsersTable />
      </main>
    </section>
  );
};

export default Users;
