// Import necessary components and hooks
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Dropdown,
  Input,
  message,
  Table,
  TableColumnsType,
} from "antd";
import { Ellipsis, PencilLine, Plus, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { deleteQuestion, getQuestions } from "../../api";
import CreateQuestionModal from "../CreateQuestionModal";

const QuestionsTable = ({
  actionContainerRef,
}: {
  actionContainerRef: React.RefObject<HTMLDivElement>;
}) => {
  const queryClient = useQueryClient();

  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const { data: questions, isFetching } = useQuery({
    queryKey: ["questions"],
    queryFn: getQuestions,
    initialData: [],
  });

  const deleteQuestionMutation = useMutation({
    mutationKey: ["delete-question"],
    mutationFn: deleteQuestion,
    onSuccess: () => {
      message.success("Question has been deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["questions"] });
    },
  });

  const columns: TableColumnsType<TQuestion> = useMemo(
    () => [
      {
        dataIndex: "title",
        title: "Title",
      },
      {
        dataIndex: "description",
        title: "Description",
      },
      {
        dataIndex: "category",
        title: "Category",
      },
      {
        dataIndex: "difficulty",
        title: "Difficulty",
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
                  label: "Edit question",
                  onClick: () => {
                    setSelectedQuestion(record);
                  },
                },
                {
                  key: "delete",
                  icon: <Trash2 size={14} />,
                  label: "Delete question",
                  onClick: () => {
                    deleteQuestionMutation.mutate(record._id);
                  },
                },
              ],
            }}
          >
            <Button icon={<Ellipsis />} />
          </Dropdown>
        ),
      },
    ],
    [deleteQuestionMutation]
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
            <CreateQuestionModal>
              {({ onOpen }) => (
                <Button type="primary" onClick={onOpen}>
                  <Plus />
                  Create new question
                </Button>
              )}
            </CreateQuestionModal>
          </div>,
          actionContainerRef.current
        )}

      <Table columns={columns} dataSource={questions} loading={isFetching} />
      {/* <UpdateQuestionModal
        open={!!selectedQuestion}
        onOpenChange={(open) => setSelectedQuestion(open ? selectedQuestion : null)}
        onClose={() => setSelectedQuestion(null)}
        question={selectedQuestion}
      /> */}
    </div>
  );
};

export default QuestionsTable;
