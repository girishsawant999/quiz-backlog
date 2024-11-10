import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { AppSidebar } from "./AppSidebar";

const PrivateLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Layout className="bg-slate-100">
      <AppSidebar />
      <Content className="relative w-full overflow-hidden grid rounded-tl-2xl border-s border-slate-200 border-solid bg-white mt-1.5 h-[calc(100svh_-_6px)]">
        {children}
      </Content>
    </Layout>
  );
};

export default PrivateLayout;
