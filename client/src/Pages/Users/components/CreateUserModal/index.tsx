import toast from "@/components/Toaster";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Drawer, Form, Input, Select } from "antd";
import { createSchemaFieldRule } from "antd-zod";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { z } from "zod";
import { createUser } from "../../api";

type CreateUserProps = {
  children: (props: {
    onOpen: () => void;
    onClose: () => void;
  }) => React.ReactNode;
};

const userRoles = {
  OPERATOR: "Operator",
  APPROVER: "Approver",
};

const createUserFormSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  mobile: z.string().min(10, {
    message: "Please enter a valid mobile number.",
  }),
  role: z.string(),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

const rule = createSchemaFieldRule(createUserFormSchema);

const CreateUser: React.FC<CreateUserProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const [form] = useForm<z.infer<typeof createUserFormSchema>>();

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

  const userMutation = useMutation({
    mutationKey: ["createUser"],
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      onClose();
      toast.success("User created successfully.");
    },
  });

  const onSubmit = async (values: z.infer<typeof createUserFormSchema>) => {
    userMutation.mutate(values);
  };

  return (
    <>
      {children({ onOpen, onClose })}
      <Drawer
        title="Create User"
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
              loading={userMutation.isPending}
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
          initialValues={{ role: userRoles.OPERATOR }}
        >
          <Form.Item label="First Name" name="firstName" rules={[rule]}>
            <Input placeholder="Enter first name" />
          </Form.Item>
          <Form.Item label="Last Name" name="lastName" rules={[rule]}>
            <Input placeholder="Enter last name" />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[rule]}>
            <Input placeholder="Enter email" />
          </Form.Item>
          <Form.Item label="Mobile" name="mobile" rules={[rule]}>
            <Input placeholder="Enter mobile" maxLength={10} />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[rule]}>
            <Input.Password placeholder="Enter password" />
          </Form.Item>
          <Form.Item label="Role" name="role" rules={[rule]}>
            <Select placeholder="Select a role">
              {Object.entries(userRoles).map(([key, value]) => (
                <Select.Option key={key} value={value}>
                  {value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};

export default CreateUser;
