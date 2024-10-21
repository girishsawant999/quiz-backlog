import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { getUsers } from "../../api";
import { DataTable } from "./DataTable";

const UsersTable = () => {
  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    initialData: [],
  });

  const columns: ColumnDef<TUser>[] = [
    {
      accessorKey: "firstName",
      header: "First Name",
    },
    {
      accessorKey: "lastName",
      header: "Last Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "mobile",
      header: "Mobile",
    },
    {
      accessorKey: "role",
      header: "Role",
    },
  ];

  return <DataTable columns={columns} data={data} />;
};

export default UsersTable;
