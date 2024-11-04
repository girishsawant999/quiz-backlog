import { PlusOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Dropdown,
  Input,
  message,
  Table,
  TableColumnsType,
} from "antd";
import { Ellipsis, PencilLine, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { deleteUser, getUsers } from "../../api";
import CreateUser from "../CreateUserModal";
import UpdateUserModal from "../UpdateUserModal";

const UsersTable = ({
  actionContainerRef,
}: {
  actionContainerRef: React.RefObject<HTMLDivElement>;
}) => {
  const queryClient = useQueryClient();

  const [currentUser, setCurrentUser] = useState<TUser | null>(null);

  const { data, isFetching } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    initialData: [],
  });

  const deleteUserMutation = useMutation({
    mutationKey: ["delete-user"],
    mutationFn: deleteUser,
    onSuccess: () => {
      message.success("User has been deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const columns: TableColumnsType<TUser> = useMemo(
    () =>
      [
        {
          dataIndex: "firstName",
          title: "First Name",
        },
        {
          dataIndex: "lastName",
          title: "Last Name",
        },
        {
          dataIndex: "email",
          title: "Email",
        },
        {
          dataIndex: "mobile",
          title: "Mobile",
        },
        {
          dataIndex: "role",
          title: "Role",
        },
        {
          title: "Actions",
          render: (_, record) => (
            <Dropdown
              menu={{
                items: [
                  {
                    key: "edit",
                    icon: <PencilLine size={14} />,
                    label: "Edit user",
                    onClick: () => {
                      setCurrentUser(record);
                    },
                  },
                  {
                    key: "delete",
                    icon: <Trash2 size={14} />,
                    label: "Delete user",
                    onClick: () => {
                      deleteUserMutation.mutate(record._id);
                    },
                  },
                ],
              }}
            >
              <Button icon={<Ellipsis />} />
            </Dropdown>
          ),
        },
      ] as TableColumnsType<TUser>,
    [deleteUserMutation]
  );

  const [globalFilter, setGlobalFilter] = useState("");

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
                <Button type="primary" onClick={onOpen}>
                  <PlusOutlined />
                  Create new user
                </Button>
              )}
            </CreateUser>
          </div>,
          actionContainerRef.current
        )}

      <Table columns={columns} dataSource={data} loading={isFetching} />
      <UpdateUserModal
        open={!!currentUser}
        onOpenChange={(open) => setCurrentUser(open ? currentUser : null)}
        onClose={() => setCurrentUser(null)}
        user={currentUser}
      />
    </div>
  );
};

export default UsersTable;
