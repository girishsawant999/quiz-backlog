import toast from "@/components/Toaster";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Dropdown,
  Input,
  Table,
  TableColumnsType,
  Tag,
  Tooltip,
} from "antd";
import { Ellipsis, PencilLine, Trash2 } from "lucide-react";
import { useMemo } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import colors from "tailwindcss/colors";
import { deleteQuestion } from "../../api";
import { useQuestionsContext } from "../../context";
import { QUESTION_DIFFICULTIES } from "../../schema";

const PER_PAGE = 10;

const QuestionsTable = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    questionsQuery: {
      data: { questions, totalQuestions },
      isFetching,
    },
    actionContainerRef,
    state,
    dispatch,
  } = useQuestionsContext();

  const deleteQuestionMutation = useMutation({
    mutationKey: ["delete-question"],
    mutationFn: deleteQuestion,
    onSuccess: () => {
      toast.success("Question has been deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["questions"] });
    },
  });

  const columns: TableColumnsType<TQuestion> = useMemo(
    () => [
      {
        dataIndex: "title",
        title: "Title",
        width: 400,
        fixed: "left",
      },
      {
        dataIndex: "description",
        title: "Description",
        render: (description) =>
          description.length > 50 ? (
            <Tooltip
              title={description}
              children={`${description.slice(0, 50)}...`}
            />
          ) : (
            description
          ),
      },
      {
        dataIndex: "options",
        title: "Options",
        render: (options: TQuestion["options"]) =>
          options.map((option) => option.optionValue).join(", "),
      },
      {
        dataIndex: "correctOption",
        title: "Correct Option",
        render: (correctOption, record) =>
          record.options.find((option) => option.optionId === correctOption)
            ?.optionValue,
      },
      {
        dataIndex: "difficulty",
        title: "Difficulty",
        render: (difficulty) => (
          <Tag
            color={
              difficulty === QUESTION_DIFFICULTIES.EASY
                ? colors.emerald[500]
                : difficulty === QUESTION_DIFFICULTIES.MEDIUM
                ? colors.amber[500]
                : colors.rose[500]
            }
          >
            {difficulty}
          </Tag>
        ),
      },
      {
        dataIndex: "category",
        title: "Category",
        render: (category) => category.category,
      },
      {
        dataIndex: "isVerified",
        title: "Verified",
        render: (isVerified) =>
          isVerified ? (
            <Tag color={colors.emerald[500]}>Yes</Tag>
          ) : (
            <Tag color={colors.gray[500]}>No</Tag>
          ),
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

  return (
    <div className="w-full">
      {actionContainerRef.current &&
        createPortal(
          <div className="flex items-center gap-3">
            <Input
              placeholder="Search..."
              value={state.search}
              onChange={(event) =>
                dispatch({ type: "SET_SEARCH", payload: event.target.value })
              }
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

      <Table
        columns={columns}
        dataSource={questions}
        loading={isFetching}
        scroll={{ x: true }}
        pagination={{
          current: state.page,
          onChange: (page) => dispatch({ type: "SET_PAGE", payload: page }),
          total: totalQuestions,
          pageSize: PER_PAGE,
        }}
      />
    </div>
  );
};

export default QuestionsTable;
