import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import CreateUser from "@/Pages/Users/components/CreateUserModal";
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
import DataTable from "../../../../components/DataTable";
import { deleteQuestion, getQuestions } from "../../api";

const QuestionsTable = ({
  actionContainerRef,
}: {
  actionContainerRef: React.RefObject<HTMLDivElement>;
}) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [selectedQuestion, setSelectedQuestion] = useState<TQuestion | null>(
    null
  );

  const { data: questions, isFetching } = useQuery({
    queryKey: ["questions"],
    queryFn: getQuestions,
    initialData: [],
  });

  const deleteUserMutation = useMutation({
    mutationKey: ["delete-question"],
    mutationFn: deleteQuestion,
    onSuccess: () => {
      toast({
        title: "Question has been deleted successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["questions"] });
    },
  });

  const columns = useMemo<ColumnDef<TQuestion>[]>(
    () => [
      {
        accessorKey: "title",
        header: "Title",
      },
      {
        accessorKey: "description",
        header: "Description",
      },
      {
        accessorKey: "category",
        header: "Category",
      },
      {
        accessorKey: "difficulty",
        header: "Difficulty",
      },
      {
        header: "Options",
        cell: ({ row }) => (
          <div className="flex gap-1">
            {row.original.options.map(
              (option: TQuestion["options"][number]) => (
                <span>{option.optionValue},</span>
              )
            )}
          </div>
        ),
      },
      {
        header: "Options",
        cell: ({ row }) => {
          const options = (row.original as TQuestion).options;
          const correctOpt = options.find(
            (_: TQuestion["options"][number]) =>
              _.optionId === (row.original as TQuestion).correctOption
          );
          return (
            <div className="flex gap-1">
              <span>{correctOpt.optionValue}</span>
            </div>
          );
        },
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-8 h-8 p-0">
                <DotsHorizontalIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => setSelectedQuestion(row.original)}
              >
                <Pen className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => deleteUserMutation.mutate(row.original._id)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    [deleteUserMutation]
  );

  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data: questions,
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
                  Create new question
                </Button>
              )}
            </CreateUser>
          </div>,
          actionContainerRef.current
        )}

      <DataTable<TUser> table={{ ...table, loading: isFetching }} />
      {/* <UpdateUserModal
        open={!!currentUser}
        onOpenChange={(open) => setCurrentUser(open ? currentUser : null)}
        onClose={() => setCurrentUser(null)}
        user={currentUser as TUser}
      /> */}
    </div>
  );
};

export default QuestionsTable;
