import { Button, Card, Form, Input } from "antd";
import { createSchemaFieldRule } from "antd-zod";
import { useForm } from "antd/es/form/Form";
import { z } from "zod";
import { useAuth } from "../context";

const signInFormSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

const rule = createSchemaFieldRule(signInFormSchema);

const SignIn = () => {
  const { login } = useAuth();
  const [form] = useForm<z.infer<typeof signInFormSchema>>();

  const onSubmit = async (values: z.infer<typeof signInFormSchema>) => {
    await login(values.email, values.password);
  };

  return (
    <section className="min-h-screen grid place-items-center">
      <Card className="w-[350px] shadow">
        <Form
          layout="vertical"
          form={form}
          onFinish={onSubmit}
          initialValues={{ email: "admin@admin.com", password: "admin_2024" }}
        >
          <Form.Item>
            <h2 className="text-gray-800 font-semibold text-base">Sign In</h2>
            <p className="text-gray-600 text-sm">
              Sign in to your account to continue
            </p>
          </Form.Item>
          <Form.Item>
            <div className="grid w-full items-center gap-2">
              <Form.Item name="email" label="Email" rules={[rule]}>
                <Input placeholder="Enter email address" />
              </Form.Item>

              <Form.Item name="password" label="Password" rules={[rule]}>
                <Input.Password placeholder="Enter password" />
              </Form.Item>
            </div>
          </Form.Item>
          <Form.Item>
            <Button
              block
              type="primary"
              htmlType="submit"
              onClick={form.submit}
            >
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </section>
  );
};

export default SignIn;
