import toast from "@/components/Toaster";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Drawer, Form, Input, Select } from "antd";
import { createSchemaFieldRule } from "antd-zod";
import { useForm } from "antd/es/form/Form";
import { useEffect } from "react";
import { z } from "zod";
import { updateUser } from "../../api";

type UpdateUserModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClose: () => void;
  user: TUser | null;
};

const userRoles = {
  OPERATOR: "Operator",
  APPROVER: "Approver",
};

const UpdateUserFormSchema = z.object({
  _id: z.string(),
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
});

const rule = createSchemaFieldRule(UpdateUserFormSchema);

const UpdateUserModal: React.FC<UpdateUserModalProps> = ({
  open,
  onClose,
  user,
}) => {
  const queryClient = useQueryClient();
  const [form] = useForm<z.infer<typeof UpdateUserFormSchema>>();

  useEffect(() => {
    if (open && user) {
      form.resetFields();
      form.setFieldsValue(user);
    }
  }, [form, open, user]);

  const userMutation = useMutation({
    mutationKey: ["updateUser"],
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      onClose();
      toast.success("User updated successfully.");
    },
  });

  const onSubmit = async (values: z.infer<typeof UpdateUserFormSchema>) => {
    userMutation.mutate(values);
  };

  return (
    <>
      <Drawer
        title="Update User"
        open={open}
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
          <Form.Item name="_id" hidden>
            <Input />
          </Form.Item>
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

export default UpdateUserModal;
