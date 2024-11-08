import toast from "@/components/Toaster";
import { Button, Form, FormInstance, Input, Modal, Select } from "antd";
import { createSchemaFieldRule } from "antd-zod";
import FormItem from "antd/es/form/FormItem";
import clsx from "clsx";
import { Plus } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { createQuestionCategory } from "../../api";
import { useQuestionsContext } from "../../context";

const addQuestionCategorySchema = z.object({
  category: z
    .string({
      message: "Category is required",
    })
    .min(3, {
      message: "Category must be at least 3 characters",
    }),
  description: z.string({
    message: "Description is required",
  }),
});

const rule = createSchemaFieldRule(addQuestionCategorySchema);

const QuestionCategories = ({
  form,
  className,
}: {
  form?: FormInstance;
  className?: string;
}) => {
  const [questionCategoryForm] =
    Form.useForm<z.infer<typeof addQuestionCategorySchema>>();

  const { questionCategoriesQuery } = useQuestionsContext();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onFinish = async (
    values: z.infer<typeof addQuestionCategorySchema>
  ) => {
    try {
      await questionCategoryForm.validateFields();
      const data = await createQuestionCategory(values);
      await questionCategoriesQuery.refetch();
      toast.success(
        `${data.data.questionCategory.category} category added successfully!`
      );

      form?.setFieldsValue({ category: data.data.questionCategory._id });
      onCloseModal();
    } catch (err) {
      console.log(err);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const onCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <FormItem
        name="category"
        label="Question Category"
        className={clsx(className)}
        rules={[{ required: true }]}
      >
        <div className="flex gap-2 items-center">
          <Select
            placeholder="Select a category"
            loading={questionCategoriesQuery.isFetching}
            className="flex-1"
            onChange={(value) => form?.setFieldsValue({ category: value })}
          >
            {questionCategoriesQuery.data.map((category) => (
              <Select.Option key={category._id} value={category._id}>
                {category.category}
              </Select.Option>
            ))}
          </Select>
          <Button type="primary" onClick={showModal} icon={<Plus />} />
        </div>
      </FormItem>

      {isModalVisible && (
        <Modal
          title="Add New Category"
          open={isModalVisible}
          onCancel={onCloseModal}
          footer={
            <div className="grid grid-cols-2 gap-3">
              <Button onClick={onCloseModal}>Cancel</Button>
              <Button
                type="primary"
                htmlType="submit"
                onClick={questionCategoryForm.submit}
              >
                Add Category
              </Button>
            </div>
          }
        >
          <Form<z.infer<typeof addQuestionCategorySchema>>
            form={questionCategoryForm}
            onFinish={onFinish}
            layout="vertical"
            className="grid grid-cols-1"
          >
            <FormItem name="category" label="Category" rules={[rule]}>
              <Input placeholder="Enter category name" />
            </FormItem>
            <FormItem name="description" label="Description" rules={[rule]}>
              <Input.TextArea
                placeholder="Enter category description"
                autoSize={{
                  maxRows: 3,
                  minRows: 2,
                }}
              />
            </FormItem>
          </Form>
        </Modal>
      )}
    </>
  );
};

export default QuestionCategories;
