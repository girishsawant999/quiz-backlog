import { ConfigProvider } from "antd";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import colors from "tailwindcss/colors";
import App from "./App.tsx";

import clsx from "clsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: colors.indigo[600],
        },
      }}
      menu={{
        className: clsx(
          "[&.ant-menu-inline.ant-menu-inline]:border-e-0 [&_.ant-menu-item]:px-2 [&_.ant-menu-item]:h-8 [&_.ant-menu-item_svg]:size-4 [&_.ant-menu-item_.ant-menu-title-content]:text-sm",
          "[&_.ant-menu-item.ant-menu-item-selected]:bg-white [&_.ant-menu-item.ant-menu-item-selected]:ring-1 [&_.ant-menu-item.ant-menu-item-selected]:ring-gray-200"
        ),
      }}
      dropdown={{
        className: clsx(
          "[&_.ant-dropdown-menu-item]:px-2 [&_.ant-dropdown-menu-item]:h-8 [&_.ant-dropdown-menu-item_svg]:size-4 [&_.ant-dropdown-menu-item_.ant-dropdown-menu-title-content]:text-sm"
        ),
      }}
      layout={{
        className: clsx(
          "bg-white",
          "[&_.ant-layout-sider]:bg-slate-100 [&_.ant-layout-sider_.ant-layout-sider-children]:px-2 [&_.ant-layout-sider_.ant-layout-sider-children]:py-4"
        ),
      }}
      table={{
        className: clsx(
          "[&_.ant-table-content_.ant-table-thead_.ant-table-cell]:px-4 [&_.ant-table-content_.ant-table-thead_.ant-table-cell]:py-2 [&_.ant-table-content_.ant-table-thead_.ant-table-cell]:bg-transparent [&_.ant-table-content_.ant-table-thead_.ant-table-cell]:text-xs [&_.ant-table-content_.ant-table-thead_.ant-table-cell]:text-gray-600 [&_.ant-table-content_.ant-table-thead_.ant-table-cell]:border-b-2",
          "[&_.ant-table-content_.ant-table-tbody_.ant-table-cell]:px-4 [&_.ant-table-content_.ant-table-tbody_.ant-table-cell]:py-2 [&_.ant-table-content_.ant-table-tbody_.ant-table-cell]:bg-transparent [&_.ant-table-content_.ant-table-tbody_.ant-table-cell]:text-sm [&_.ant-table-content_.ant-table-tbody_.ant-table-cell]:text-gray-600 ",
          "[&_.ant-pagination.ant-table-pagination]:my-2"
        ),
      }}
      drawer={{
        classNames: {
          wrapper: clsx("m-2"),
          content: clsx("rounded-lg"),
          header: clsx(
            "bg-gray-100 [&.ant-drawer-header]:px-4 relative [&_.ant-drawer-close]:absolute [&_.ant-drawer-close]:top-4 [&_.ant-drawer-close]:right-4"
          ),
          footer: clsx("bg-gray-100"),
          body: clsx("[&.ant-drawer-body]:p-4"),
        },
      }}
      divider={{
        className: clsx(
          "border-t-gray-300/80 border-t border-b border-b-gray-200/80 rounded-sm my-3"
        ),
      }}
    >
      <App />
    </ConfigProvider>
  </StrictMode>
);
