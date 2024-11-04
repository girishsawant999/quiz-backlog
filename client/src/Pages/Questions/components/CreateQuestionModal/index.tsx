import toast from "@/components/Toaster";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Checkbox, Drawer, Form, Input, Select } from "antd";
import { createSchemaFieldRule } from "antd-zod";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { z } from "zod";
import { createQuestion } from "../../api";

type CreateQuestionProps = {
  children: (props: {
    onOpen: () => void;
    onClose: () => void;
  }) => React.ReactNode;
};

const questionDifficulty = {
  EASY: "Easy",
  MEDIUM: "Medium",
  HARD: "Hard",
};

const questionCategories = {
  MATH: "Mathematics",
  SCIENCE: "Science",
  HISTORY: "History",
};

export const createQuestionFormSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  description: z.string().optional(),
  options: z.array(z.string()),
  correctOption: z.string(),
  difficulty: z.enum(["Easy", "Medium", "Hard"]),
  category: z.enum(["Mathematics", "Science", "History"]),
  isPractice: z.boolean(),
});

const rule = createSchemaFieldRule(createQuestionFormSchema);

const CreateQuestion: React.FC<CreateQuestionProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const [form] = useForm<z.infer<typeof createQuestionFormSchema>>();

  useEffect(() => {
    if (isOpen) {
      form.resetFields();
    }
  }, [form, isOpen]);

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const questionMutation = useMutation({
    mutationKey: ["createQuestion"],
    mutationFn: createQuestion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["questions"] });
      onClose();
      toast.success("Question created successfully.");
    },
  });

  const onSubmit = async (values: z.infer<typeof createQuestionFormSchema>) => {
    questionMutation.mutate(values);
  };

  return (
    <>
      {children({ onOpen, onClose })}
      <Drawer
        title="Create Question"
        open={isOpen}
        onClose={onClose}
        footer={
          <div className="grid grid-cols-2 gap-3">
            <Button key="back" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={questionMutation.isPending}
              onClick={form.submit}
            >
              Save
            </Button>
          </div>
        }
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onSubmit}
          initialValues={{
            difficulty: questionDifficulty.EASY,
            category: questionCategories.MATH,
            options: [],
          }}
        >
          {({ options }) => {
            return (
              <>
                <Form.Item label="Title" name="title" rules={[rule]}>
                  <Input placeholder="Enter question title" />
                </Form.Item>
                <Form.Item
                  label="Description"
                  name="description"
                  rules={[rule]}
                >
                  <Input.TextArea placeholder="Enter question description" />
                </Form.Item>
                <Form.Item label="Options" name="options" rules={[rule]}>
                  <Select mode="tags" placeholder="Enter options" />
                </Form.Item>
                <Form.Item
                  label="Correct Option"
                  name="correctOption"
                  rules={[rule]}
                >
                  <Select placeholder="Select correct option">
                    {options.map((option: string, index: number) => (
                      <Select.Option key={index} value={option}>
                        {option}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item label="Difficulty" name="difficulty" rules={[rule]}>
                  <Select placeholder="Select difficulty">
                    {Object.entries(questionDifficulty).map(([key, value]) => (
                      <Select.Option key={key} value={value}>
                        {value}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item label="Category" name="category" rules={[rule]}>
                  <Select placeholder="Select category">
                    {Object.entries(questionCategories).map(([key, value]) => (
                      <Select.Option key={key} value={value}>
                        {value}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Is Practice?"
                  name="isPractice"
                  valuePropName="checked"
                  layout="horizontal"
                >
                  <Checkbox />
                </Form.Item>
              </>
            );
          }}
        </Form>
      </Drawer>
    </>
  );
};

export default CreateQuestion;
