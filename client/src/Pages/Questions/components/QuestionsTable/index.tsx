import { useMutation, useQueryClient } from "@tanstack/react-query";
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
import { useNavigate } from "react-router-dom";
import { deleteQuestion } from "../../api";
import { useQuestionsContext } from "../../context";

const QuestionsTable = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    questionsQuery: { data: questions, isFetching },
    actionContainerRef,
  } = useQuestionsContext();

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
                    navigate(`/questions/${record._id}/edit`);
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
    [deleteQuestionMutation, navigate]
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

            <Dropdown.Button
              type="primary"
              onClick={() => {
                navigate("/questions/new");
              }}
              menu={{
                items: [
                  {
                    key: "create-practice",
                    label: "Create practice question",
                    onClick: () => {
                      navigate("/questions/new?type=practice");
                    },
                  },
                ],
              }}
            >
              Create question
            </Dropdown.Button>
          </div>,
          actionContainerRef.current
        )}

      <Table columns={columns} dataSource={questions} loading={isFetching} />
    </div>
  );
};

export default QuestionsTable;
