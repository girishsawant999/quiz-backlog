import { Header } from "antd/es/layout/layout";
import { forwardRef } from "react";

interface PageHeaderProps {
  title: string;
  description: React.ReactNode;
  actionContainerRef?: React.Ref<HTMLDivElement>;
}

const PageHeader = forwardRef<HTMLDivElement, PageHeaderProps>(
  ({ title, description, actionContainerRef = null }, ref) => {
    return (
      <Header
        ref={ref}
        className="flex  justify-between px-6 py-4 border-b border-gray-200 bg-white h-20"
      >
        <div className="min-w-0 flex-1">
          <h1 className="!text-xl font-semibold leading-7 !text-gray-900 sm:truncate sm:text-4xl sm:tracking-tight">
            {title}
          </h1>
          <div className="mt-2 flex text-sm text-gray-500 flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
            {description}
          </div>
        </div>
        <div className="mt-5 flex lg:ml-4 lg:mt-0" ref={actionContainerRef} />
      </Header>
    );
  }
);

PageHeader.displayName = "PageHeader";

export default PageHeader;
