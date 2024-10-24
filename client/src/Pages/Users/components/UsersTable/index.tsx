import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Pen, Plus, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { deleteUser, getUsers } from "../../api";
import CreateUser from "../CreateUserModal";
import UpdateUserModal from "../UpdateUserModal";
import DataTable from "./DataTable";

const UsersTable = ({
  actionContainerRef,
}: {
  actionContainerRef: React.RefObject<HTMLDivElement>;
}) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [currentUser, setCurrentUser] = useState(null);

  const { data, isFetching } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    initialData: [],
  });

  const deleteUserMutation = useMutation({
    mutationKey: ["delete-user"],
    mutationFn: deleteUser,
    onSuccess: (data) => {
      console.log("data", data);
      toast({
        title: "User has been deleted successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const columns: ColumnDef<TUser>[] = useMemo(
    () => [
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
      {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <DotsHorizontalIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel className="border-b border-gray-200">
                  Actions
                </DropdownMenuLabel>
                <DropdownMenuItem onClick={() => setCurrentUser(row.original)}>
                  <Pen />
                  Edit user
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-rose-600 hover:!bg-red-100 hover:!text-rose-600"
                  onClick={() => deleteUserMutation.mutate(row.original._id)}
                >
                  <Trash2 />
                  Delete user
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [deleteUserMutation]
  );

  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    state: {
      globalFilter,
    },
  });

  return (
    <div className="w-full">
      {actionContainerRef.current &&
        createPortal(
          <div className="flex items-center gap-3">
            <Input
              placeholder="Search..."
              value={globalFilter}
              onChange={(event) => setGlobalFilter(event.target.value)}
              className="max-w-sm"
            />
            <CreateUser>
              {({ onOpen }) => (
                <Button className="ml-auto" onClick={onOpen}>
                  <Plus size={16} />
                  Create new user
                </Button>
              )}
            </CreateUser>
          </div>,
          actionContainerRef.current
        )}

      <DataTable<TUser> table={{ ...table, loading: isFetching }} />
      <UpdateUserModal
        open={!!currentUser}
        onOpenChange={(open) => setCurrentUser(open ? currentUser : null)}
        onClose={() => setCurrentUser(null)}
        user={currentUser as TUser}
      />
    </div>
  );
};

export default UsersTable;
