import toast from "@/components/Toaster";
import useDebounce from "@/hooks/use-debounce";
import { useAuthContext } from "@/Pages/Auth/context";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Dropdown, Input, Table, Tag, Tooltip } from "antd";
import { ItemType } from "antd/es/menu/interface";
import { ColumnsType, TableProps } from "antd/es/table";
import { CheckCircle, Ellipsis, PencilLine, Trash2 } from "lucide-react";
import { useCallback, useMemo } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import colors from "tailwindcss/colors";
import { deleteQuestion, getQuestions } from "../../api";
import { useQuestionsContext } from "../../context";
import { QUESTION_DIFFICULTIES } from "../../schema";
import useQuestionTableReducer from "./reducer";

const PER_PAGE = 10;

const QuestionsTable = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { userInRole, userNotInRole } = useAuthContext();
  const { actionContainerRef } = useQuestionsContext();

  const [state, dispatch] = useQuestionTableReducer();
  const debouncedState = useDebounce(state, 500);

  const {
    data: { questions, totalQuestions },
    isFetching,
  } = useQuery({
    queryKey: ["questions", debouncedState],
    queryFn: () => getQuestions(debouncedState),
    initialData: {
      questions: [],
      totalPages: 1,
      totalQuestions: 0,
      currentPage: 1,
    },
  });

  const deleteQuestionMutation = useMutation({
    mutationKey: ["delete-question"],
    mutationFn: deleteQuestion,
    onSuccess: () => {
      toast.success("Question has been deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["questions"] });
    },
  });

  const getActionItems = useCallback(
    (record: TQuestion) => {
      const actionItemsMap: Record<
        "edit" | "verify" | "delete" | "divider",
        ItemType
      > = {
        edit: {
          key: "edit",
          icon: <PencilLine size={14} />,
          label: "Edit question",
          onClick: () => {
            navigate(`/questions/${record._id}/edit`, {
              state: { question: record },
            });
          },
        },
        verify: {
          key: "verify",
          icon: <CheckCircle size={14} />,
          label: "Verify question",
          onClick: () => {
            navigate(`/questions/${record._id}/verify`, {
              state: { question: record, questions },
            });
          },
        },
        delete: {
          key: "delete",
          icon: <Trash2 size={14} />,
          label: "Delete question",
          className: "!text-rose-600 hover:!bg-rose-100",
          onClick: () => {
            deleteQuestionMutation.mutate(record._id);
          },
        },
        divider: {
          key: "divider",
          type: "divider",
        },
      };

      const items: ItemType[] = [];

      if (userInRole("Admin")) {
        items.push(
          actionItemsMap.edit,
          actionItemsMap.verify,
          actionItemsMap.divider,
          actionItemsMap.delete
        );
      } else if (userInRole("Operator")) {
        items.push(
          actionItemsMap.edit,
          actionItemsMap.divider,
          actionItemsMap.delete
        );
      } else if (userInRole("Approver")) {
        items.push(
          actionItemsMap.edit,
          actionItemsMap.verify,
          actionItemsMap.divider,
          actionItemsMap.delete
        );
      }

      return items;
    },
    [userInRole, navigate, questions, deleteQuestionMutation]
  );

  const columns: ColumnsType<TQuestion> = useMemo(
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
        filters: [
          {
            text: "Easy",
            value: QUESTION_DIFFICULTIES.EASY,
          },
          {
            text: "Medium",
            value: QUESTION_DIFFICULTIES.MEDIUM,
          },
          {
            text: "Hard",
            value: QUESTION_DIFFICULTIES.HARD,
          },
        ],
        filterMultiple: false,
        filteredValue: state.difficulty ? [state.difficulty] : undefined,
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
        filters: [
          {
            text: "Verified",
            value: true,
          },
          {
            text: "Not Verified",
            value: false,
          },
        ],
        filterMultiple: false,
        filteredValue: state.isVerified !== undefined ? [state.isVerified] : [],
      },
      {
        title: "Actions",
        render: (_, record) => (
          <Dropdown
            menu={{
              items: getActionItems(record),
            }}
          >
            <Button icon={<Ellipsis />} />
          </Dropdown>
        ),
      },
    ],
    [getActionItems, state.difficulty, state.isVerified]
  );

  const onTableChange: TableProps<TQuestion>["onChange"] = (_, filters) => {
    const { isVerified, difficulty } = filters;

    if (isVerified?.[0] !== state.isVerified) {
      dispatch({
        type: "SET_VERIFIED",
        payload: (isVerified?.[0] as boolean) ?? undefined,
      });
    }

    if (difficulty?.[0] !== state.difficulty) {
      dispatch({
        type: "SET_DIFFICULTY",
        payload: (difficulty?.[0] as string) ?? undefined,
      });
    }
  };

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
            {userNotInRole("Approver") && (
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
            )}
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
        onChange={onTableChange}
      />
    </div>
  );
};

export default QuestionsTable;
