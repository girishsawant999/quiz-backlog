import { forwardRef } from "react";

interface PageHeaderProps {
  title: string;
  description: React.ReactNode;
  actionContainerRef?: React.Ref<HTMLDivElement>;
}

const PageHeader = forwardRef<HTMLDivElement, PageHeaderProps>(
  ({ title, description, actionContainerRef = null }, ref) => {
    return (
      <div
        ref={ref}
        className="lg:flex lg:items-center lg:justify-between pb-5 border-b border-gray-200 mb-5"
      >
        <div className="min-w-0 flex-1 border-s-4 border-gray-300 ps-2">
          <h1 className="text-xl font-semibold leading-7 text-gray-900 sm:truncate sm:text-4xl sm:tracking-tight">
            {title}
          </h1>
          <div className="mt-2 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
            {description}
          </div>
        </div>
        <div
          className="mt-5 flex lg:ml-4 lg:mt-0"
          ref={actionContainerRef}
        ></div>
      </div>
    );
  }
);

PageHeader.displayName = "PageHeader";

export default PageHeader;
