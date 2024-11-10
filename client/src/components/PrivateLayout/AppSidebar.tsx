import useLocalStorage from "@/hooks/use-localstorage";
import { useAuthContext } from "@/Pages/Auth/context";
import { Divider, Dropdown, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import clsx from "clsx";
import { ChevronsRight, Home, LogOut, Logs, User, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import colors from "tailwindcss/colors";

// Menu items.
const items = [
  {
    key: "dashboard",
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    key: "users",
    title: "Users",
    url: "/users",
    icon: Users,
  },
  {
    key: "questions",
    title: "Questions",
    url: "/questions",
    icon: Logs,
  },
];

export function AppSidebar() {
  const { user, logout } = useAuthContext();
  const [collapsed, setCollapsed] = useLocalStorage("sidebar-collapsed", false);
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState(
    location.pathname.split("/")[1] || "/"
  );

  useEffect(() => {
    setSelectedKey(location.pathname.split("/")[1] || "/");
  }, [location]);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Sider
      theme="light"
      className="relative"
      collapsed={collapsed}
      collapsedWidth={56}
    >
      <button
        onClick={toggleCollapse}
        className={clsx(
          "bg-white p-1 z-10 transition-transform flex items-center justify-center rounded-full ring-1 ring-slate-200 absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2",
          !collapsed && "rotate-180"
        )}
      >
        <ChevronsRight size={18} color={colors.gray[800]} />
      </button>

      <div className="logo h-[50px] flex items-center justify-between px-2"></div>
      <Divider />
      <Menu
        mode="inline"
        className="bg-transparent"
        selectedKeys={[selectedKey]}
      >
        {items.map(({ key, url, icon: Icon, title }) => (
          <Menu.Item key={key} icon={<Icon />}>
            <Link to={url}>{title}</Link>
          </Menu.Item>
        ))}
      </Menu>
      <div className="absolute bottom-2 left-2 right-2">
        <Divider />
        <Dropdown
          menu={{
            items: [
              {
                key: "sign-out",
                label: "Sign out",
                icon: <LogOut />,
                onClick: logout,
              },
            ],
          }}
          trigger={["click"]}
        >
          <div className="bg-blue-100 rounded-md ring-1 ring-blue-300 flex items-center gap-2 px-2 py-2 cursor-pointer">
            <div className="bg-gradient-to-b from-blue-200 to-blue-400 text-gray-900 ring-1 ring-blue-500 rounded-lg grid place-items-center aspect-square min-w-6">
              <User size={16} />
            </div>
            {!collapsed && (
              <div className="truncate text-sm capitalize">
                {user?.firstName} {user?.lastName}
              </div>
            )}
          </div>
        </Dropdown>
      </div>
    </Sider>
  );
}
