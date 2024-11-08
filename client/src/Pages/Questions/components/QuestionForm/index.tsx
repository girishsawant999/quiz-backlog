import toast from "@/components/Toaster";
import { useMutation } from "@tanstack/react-query";
import { Button, Checkbox, Divider, Form, Input, Select } from "antd";
import { createSchemaFieldRule } from "antd-zod";
import { ArrowLeft, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { createQuestion } from "../../api";
import QuestionCategories from "../QuestionCategories";

const questionDifficulty = {
  EASY: "Easy",
  MEDIUM: "Medium",
  HARD: "Hard",
};

const optionIds = ["A", "B", "C", "D"];

export const createQuestionSchema = z.object({
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
  const [questionForm] = Form.useForm<z.infer<typeof createQuestionSchema>>();

  const questionMutation = useMutation({
    mutationFn: (values: z.infer<typeof createQuestionSchema>) =>
      createQuestion(values),
    mutationKey: ["createQuestion"],
    onSuccess: () => {
      toast.success("Question created successfully!");
    },
  });

  const onFinish = async (values: z.infer<typeof createQuestionSchema>) => {
    try {
      questionMutation.mutate(values);
    } catch (err) {
      console.log(err);
    }
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
          New Question
        </button>
      </div>

      <div className="overflow-y-auto scrollbar-hidden">
        <Form<z.infer<typeof createQuestionSchema>>
          onFinish={onFinish}
          form={questionForm}
          layout="vertical"
          className="grid grid-cols-12 gap-4 gap-y-2"
        >
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
          <Form.Item label="Options" className="col-span-4">
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
                <div className="grid grid-cols-1 gap-3">
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

          <Form.Item
            name="correctOption"
            label="Correct Option"
            rules={[rule]}
            className="col-span-4"
          >
            <Select placeholder="Select correct option">
              {["A", "B", "C", "D"].map((option) => (
                <Select.Option key={option} value={option}>
                  {option}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <div className="col-span-4" />

          <QuestionCategories
            className="col-span-4 col-start-0"
            form={questionForm}
          />
          <Form.Item
            name="difficulty"
            label="Difficulty"
            rules={[rule]}
            className="col-span-4"
          >
            <Select placeholder="Select difficulty">
              {Object.entries(questionDifficulty).map(([key, value]) => (
                <Select.Option key={key} value={value}>
                  {value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <div className="col-span-4" />

          <Form.Item
            name="isPractice"
            label="Is Practice"
            rules={[rule]}
            className="col-span-4"
            initialValue={false}
            layout="horizontal"
          >
            <Checkbox />
          </Form.Item>
        </Form>
      </div>
      <div className="flex py-3 border-t border-gray-200 justify-end gap-3">
        <Button
          type="primary"
          onClick={questionForm.submit}
          loading={questionMutation.isPending}
        >
          Save
        </Button>
        <Button
          type="primary"
          loading={questionMutation.isPending}
          onClick={async () => {
            await questionForm.submit();
          }}
        >
          Save & Next
        </Button>
      </div>
    </section>
  );
};

export default QuestionForm;
