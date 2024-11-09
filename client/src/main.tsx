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
          "[&_.ant-table-content_.ant-table-thead_.ant-table-cell]:px-4 [&_.ant-table-content_.ant-table-thead_.ant-table-cell]:py-2 [&_.ant-table-content_.ant-table-thead_.ant-table-cell]:bg-white [&_.ant-table-content_.ant-table-thead_.ant-table-cell]:text-xs [&_.ant-table-content_.ant-table-thead_.ant-table-cell]:text-gray-600 [&_.ant-table-content_.ant-table-thead_.ant-table-cell]:border-b-2 [&_.ant-table-content_.ant-table-thead_.ant-table-cell]:whitespace-nowrap",
          "[&_.ant-table-content_.ant-table-tbody_.ant-table-cell]:px-4 [&_.ant-table-content_.ant-table-tbody_.ant-table-cell]:py-2 [&_.ant-table-content_.ant-table-tbody_.ant-table-cell]:bg-white [&_.ant-table-content_.ant-table-tbody_.ant-table-cell]:text-sm [&_.ant-table-content_.ant-table-tbody_.ant-table-cell]:text-gray-600 [&_.ant-table-content_.ant-table-tbody_.ant-table-cell]:whitespace-nowrap",
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
          "[&.ant-divider-horizontal]:border-t-gray-300/80 [&.ant-divider-horizontal]:border-t [&.ant-divider-horizontal]:border-b [&.ant-divider-horizontal]:border-b-gray-200/80 [&.ant-divider-horizontal]:rounded-sm [&.ant-divider-horizontal]:my-3",
          "[&.ant-divider-vertical]:border-r-gray-300/80  [&.ant-divider-vertical]:border-r [&.ant-divider-vertical]:border-l-gray-200/80 [&.ant-divider-vertical]:border-l "
        ),
      }}
      form={{
        colon: false,
        scrollToFirstError: true,
      }}
      input={{
        className: clsx(
          "[&.ant-input-disabled]:text-gray-600 [&.ant-input-disabled]:bg-gray-200/30"
        ),
      }}
      inputNumber={{
        className: clsx(
          "[&.ant-input-number-disabled]:text-gray-600 [&.ant-input-number-disabled]:bg-gray-200/30"
        ),
      }}
      textArea={{
        className: clsx(
          "[&.ant-input-disabled]:text-gray-600 [&.ant-input-disabled]:bg-gray-200/30"
        ),
      }}
      select={{
        className: clsx(
          "[&.ant-select-disabled_.ant-select-selection-item]:text-gray-600  [&.ant-select-disabled]:bg-gray-200/30 "
        ),
      }}
      radio={{
        className: clsx("[&.ant-radio-wrapper-disabled_span]:text-gray-600"),
      }}
      modal={{
        classNames: {
          content: clsx(
            "[&.ant-modal-content]:bg-gray-100 [&.ant-modal-content]:p-1 [&_.ant-modal-close]:top-2"
          ),
          body: clsx("[&.ant-modal-body]:p-3 py-4 bg-white rounded-lg"),
          header: clsx(
            "[&.ant-modal-header]:bg-gray-100 [&.ant-modal-header]:px-4 [&.ant-modal-header]:pt-2 [&.ant-modal-header]:pb-1 text-center"
          ),
          footer: clsx("[&.ant-modal-footer]:px-4 [&.ant-modal-footer]:pb-2"),
        },
      }}
    >
      <App />
    </ConfigProvider>
  </StrictMode>
);
