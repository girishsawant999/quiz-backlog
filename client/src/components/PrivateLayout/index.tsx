import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { AppSidebar } from "./AppSidebar";

const PrivateLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Layout>
      <AppSidebar />
      <Content className="relative w-full h-svh overflow-hidden grid">
        {children}
      </Content>
    </Layout>
  );
};

export default PrivateLayout;
