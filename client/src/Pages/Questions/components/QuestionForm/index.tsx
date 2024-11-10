import toast from "@/components/Toaster";
import { useAuthContext } from "@/Pages/Auth/context";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Checkbox, Divider, Form, Input, Radio, Select } from "antd";
import { createSchemaFieldRule } from "antd-zod";
import { ArrowLeft, Plus, X } from "lucide-react";
import { useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { z } from "zod";
import {
  createQuestion,
  getQuestion,
  updateQuestion,
  verifyQuestion,
} from "../../api";
import { useQuestionsContext } from "../../context";
import { QUESTION_DIFFICULTIES } from "../../schema";
import QuestionCategoriesWrapper from "../QuestionCategories";

const optionIds = ["A", "B", "C", "D"];

export const createQuestionSchema = z.object({
  _id: z.string().optional(),
  title: z.string({
    message: "Title is required",
  }),
  description: z.string({
    message: "Description is required",
  }),
  options: z.array(
    z.object({
      optionId: z.enum(["A", "B", "C", "D"]),
      optionValue: z.string(),
    })
  ),
  correctOption: z.string(),
  difficulty: z.string(z.enum(["Easy", "Medium", "Hard"])),
  category: z.string(),
  isPractice: z.boolean(),
});

const rule = createSchemaFieldRule(createQuestionSchema);

const QuestionForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { user } = useAuthContext();
  const { questionCategoriesQuery } = useQuestionsContext();

  const params = useParams();
  const { questionId, mode } = params as {
    questionId: string;
    mode: "edit" | "verify";
  };

  const isPractice = searchParams.get("type") === "practice";
  const [questionForm] = Form.useForm<z.infer<typeof createQuestionSchema>>();

  const questionCreateMutation = useMutation({
    mutationFn: (values: z.infer<typeof createQuestionSchema>) =>
      createQuestion(values),
    mutationKey: ["createQuestion"],
    onSuccess: () => {
      toast.success("Question created successfully!");
    },
  });

  const questionUpdateMutation = useMutation({
    mutationFn: (values: z.infer<typeof createQuestionSchema>) =>
      updateQuestion(values),
    mutationKey: ["updateQuestion"],
    onSuccess: () => {
      toast.success("Question updated successfully!");
    },
  });

  const verifyQuestionMutation = useMutation({
    mutationKey: ["verifyQuestion"],
    mutationFn: (values: { _id: string; verifiedBy: string }) =>
      verifyQuestion(values._id, values.verifiedBy),
    onSuccess: () => {
      toast.success("Question verified successfully!");
    },
  });

  const questionQuery = useQuery({
    queryKey: ["question", questionId],
    queryFn: () => getQuestion(questionId!),
    initialData: null,
    enabled: !!questionId,
  });

  useEffect(() => {
    if (questionQuery.data) {
      questionForm.setFieldsValue({
        _id: questionQuery.data._id,
        title: questionQuery.data.title,
        description: questionQuery.data.description,
        options: questionQuery.data.options.map((option) => ({
          optionId: option.optionId as "A" | "B" | "C" | "D",
          optionValue: option.optionValue,
        })),
        correctOption: questionQuery.data.correctOption,
        difficulty: questionQuery.data.difficulty,
        category: questionQuery.data.category._id,
        isPractice: questionQuery.data.isPractice,
      });
    }
  }, [questionQuery.data, questionForm]);

  useEffect(() => {
    if (isPractice) {
      questionForm.setFieldsValue({ isPractice: true });
    }
  }, [isPractice, questionForm]);

  const handleCreate = () => {
    questionForm.validateFields().then((values) => {
      questionCreateMutation.mutate(values, {
        onSuccess: () => {
          navigate(-1);
        },
      });
    });
  };

  const handleCreateAndNext = () => {
    questionForm.validateFields().then((values) => {
      questionCreateMutation.mutate(values, {
        onSuccess: () => {
          questionForm.resetFields();
        },
      });
    });
  };

  const handleUpdate = () => {
    questionForm.validateFields().then((values) => {
      questionUpdateMutation.mutate(values, {
        onSuccess: () => {
          navigate(-1);
        },
      });
    });
  };

  const handleVerify = () => {
    if (!user) return;
    verifyQuestionMutation.mutate(
      { _id: questionId!, verifiedBy: user._id },
      {
        onSuccess: () => {
          navigate(-1);
        },
      }
    );
  };

  return (
    <section className="grid grid-rows-[auto,1fr,auto] gap-4 overflow-hidden h-full">
      <div className="flex items-center gap-1">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-gray-400"
        >
          <ArrowLeft size={14} />
          Back
        </button>
        <Divider type="vertical" />
        <button className="flex items-center gap-1 text-gray-800" disabled>
          {mode === "edit"
            ? "Edit Question"
            : mode === "verify"
            ? "Verify Question"
            : "Create Question"}
        </button>
      </div>

      <div className="overflow-y-auto scrollbar-hidden">
        <Form<z.infer<typeof createQuestionSchema>>
          form={questionForm}
          layout="vertical"
          disabled={mode === "verify"}
          className="grid grid-cols-12 gap-x-5 gap-y-1 max-w-screen-lg"
        >
          <Form.Item name="_id" hidden>
            <Input />
          </Form.Item>
          <Form.Item
            name="title"
            label="Title"
            rules={[rule]}
            className="col-span-12"
          >
            <Input placeholder="Enter question title" autoFocus />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[rule]}
            className="col-span-12"
          >
            <Input.TextArea placeholder="Enter question description" />
          </Form.Item>

          <div className="grid col-span-6">
            <Form.Item label="Options">
              <Form.List
                name="options"
                initialValue={[
                  { optionId: "A", optionValue: "" },
                  { optionId: "B", optionValue: "" },
                  { optionId: "C", optionValue: "" },
                  { optionId: "D", optionValue: "" },
                ]}
              >
                {(fields, { add, remove }) => (
                  <div className="grid grid-cols-1 gap-2.5">
                    {fields.map(({ key, name, ...restField }, index) => (
                      <div
                        key={key}
                        className="grid grid-cols-[auto,1fr,auto] gap-2"
                      >
                        <Form.Item
                          {...restField}
                          name={[name, "optionId"]}
                          initialValue={optionIds[index]}
                        >
                          <Input disabled className="w-9" />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, "optionValue"]}
                          rules={[
                            { required: true, message: "Missing option value" },
                          ]}
                        >
                          <Input placeholder="Option value" />
                        </Form.Item>
                        {index > 1 ? (
                          <Button
                            type="primary"
                            onClick={() => remove(name)}
                            icon={<X />}
                            className="!bg-rose-600"
                          />
                        ) : (
                          <Button
                            type="primary"
                            icon={<X />}
                            className="!bg-rose-600 invisible pointer-events-none"
                          />
                        )}
                      </div>
                    ))}
                    {fields.length < 4 && (
                      <div className="grid grid-cols-[1fr,32px] gap-2">
                        <Button type="dashed" onClick={() => add()} block>
                          Add Option
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </Form.List>
            </Form.Item>
          </div>

          <div className="flex flex-col col-span-6">
            <Form.Item
              name="correctOption"
              label="Correct Option"
              rules={[rule]}
            >
              <Radio.Group className="grid grid-cols-2 gap-3">
                {["A", "B", "C", "D"].map((option) => (
                  <Radio key={option} value={option}>
                    Option - {option}
                  </Radio>
                ))}
              </Radio.Group>
            </Form.Item>

            <div className="grid grid-cols-[1fr,32px] gap-2 items-end">
              <Form.Item
                name="category"
                label="Question Category"
                rules={[rule]}
              >
                <Select
                  placeholder="Select a category"
                  loading={questionCategoriesQuery.isFetching}
                  className="flex-1"
                >
                  {questionCategoriesQuery.data.map((category) => (
                    <Select.Option key={category._id} value={category._id}>
                      {category.category}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <QuestionCategoriesWrapper form={questionForm}>
                {({ showModal }) => (
                  <Button
                    type="primary"
                    className="mb-6"
                    onClick={showModal}
                    icon={<Plus />}
                  />
                )}
              </QuestionCategoriesWrapper>
            </div>

            <Form.Item name="difficulty" label="Difficulty" rules={[rule]}>
              <Select placeholder="Select difficulty">
                {Object.entries(QUESTION_DIFFICULTIES).map(([key, value]) => (
                  <Select.Option key={key} value={value}>
                    {value}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          {isPractice && (
            <Form.Item
              name="isPractice"
              label="Is Practice"
              rules={[rule]}
              className="col-span-6"
              layout="horizontal"
              initialValue={isPractice}
            >
              <Checkbox
                name="isPractice"
                defaultChecked={isPractice}
                disabled
              />
            </Form.Item>
          )}
        </Form>
      </div>
      <div className="flex py-3 border-t border-gray-200 justify-end gap-3">
        {mode === undefined && (
          <>
            <Button type="primary" onClick={handleCreate}>
              Create
            </Button>
            <Button type="primary" onClick={handleCreateAndNext}>
              Create & Next
            </Button>
          </>
        )}
        {mode === "edit" && (
          <Button type="primary" onClick={handleUpdate}>
            Update
          </Button>
        )}
        {mode === "verify" && (
          <Button type="primary" onClick={handleVerify}>
            Verify
          </Button>
        )}
      </div>
    </section>
  );
};

export default QuestionForm;
