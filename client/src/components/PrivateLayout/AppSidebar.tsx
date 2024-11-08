import { useAuth } from "@/Pages/Auth/context";
import { Divider, Dropdown, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { Home, LogOut, Logs, User, Users } from "lucide-react";
import { Link } from "react-router-dom";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Users",
    url: "/users",
    icon: Users,
  },
  {
    title: "Questions",
    url: "/questions",
    icon: Logs,
  },
];

export function AppSidebar() {
  const { user, logout } = useAuth();

  return (
    <Sider theme="light" className="relative">
      <div className="logo h-[50px]"></div>
      <Divider />
      <Menu mode="inline" className="bg-transparent">
        {items.map(({ url, icon: Icon, title }) => (
          <Menu.Item key={url} icon={<Icon />}>
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
            <div className="bg-gradient-to-b from-blue-200 to-blue-400 text-gray-900 ring-1 ring-blue-500 rounded-lg grid place-items-center size-6">
              <User size={16} />
            </div>
            <div className="truncate text-sm capitalize">
              {user?.firstName} {user?.lastName}
            </div>
          </div>
        </Dropdown>
      </div>
    </Sider>
  );
}
