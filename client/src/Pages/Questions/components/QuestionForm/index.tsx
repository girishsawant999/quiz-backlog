import toast from "@/components/Toaster";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Checkbox, Divider, Form, Input, Radio, Select } from "antd";
import { createSchemaFieldRule } from "antd-zod";
import { ArrowLeft, Plus, X } from "lucide-react";
import { useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { z } from "zod";
import { createQuestion, getQuestion, updateQuestion } from "../../api";
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
  const queryClient = useQueryClient();
  const { questionCategoriesQuery } = useQuestionsContext();

  const params = useParams();
  const { questionId, mode } = params;

  const isPractice = searchParams.get("type") === "practice";
  const [questionForm] = Form.useForm<z.infer<typeof createQuestionSchema>>();

  const questionCreateMutation = useMutation({
    mutationFn: (values: z.infer<typeof createQuestionSchema>) =>
      createQuestion(values),
    mutationKey: ["createQuestion"],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["questions"],
      });
      toast.success("Question created successfully!");
    },
  });

  const questionUpdateMutation = useMutation({
    mutationFn: (values: z.infer<typeof createQuestionSchema>) =>
      updateQuestion(values),
    mutationKey: ["updateQuestion"],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["questions"],
      });
      toast.success("Question updated successfully!");
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

  const onFinish = async (values: z.infer<typeof createQuestionSchema>) => {
    try {
      if (mode === "edit") questionUpdateMutation.mutate(values);
      else questionCreateMutation.mutate(values);
    } catch (err) {
      console.log(err);
    }
  };

  const onCreateAndNext = async () => {
    questionForm.submit();
  };

  useEffect(() => {
    if (isPractice) {
      questionForm.setFieldsValue({ isPractice: true });
    }
  }, [isPractice, questionForm]);

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
          {mode === "edit" ? "Edit Question" : "Create Question"}
        </button>
      </div>

      <div className="overflow-y-auto scrollbar-hidden">
        <Form<z.infer<typeof createQuestionSchema>>
          onFinish={onFinish}
          form={questionForm}
          layout="vertical"
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
            <Input placeholder="Enter question title" />
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
        <Button
          type="primary"
          onClick={questionForm.submit}
          loading={
            questionCreateMutation.isPending || questionUpdateMutation.isPending
          }
        >
          {mode === "edit" ? "Update" : "Create"}
        </Button>
        {mode !== "edit" && (
          <Button
            type="primary"
            loading={questionCreateMutation.isPending}
            onClick={onCreateAndNext}
          >
            Create & Next
          </Button>
        )}
      </div>
    </section>
  );
};

export default QuestionForm;
