import SignIn from "@/Pages/Auth/SignIn";
import DashBoard from "@/Pages/DashBoard";
import UsersManagement from "@/Pages/UsersManagement";

export const PUBLIC_ROUTES = [
  {
    path: "/sign-in",
    element: <SignIn />,
  },
];

export const PRIVATE_ROUTES = [
  {
    path: "/",
    element: <DashBoard />,
  },
  {
    path: "/users",
    element: <UsersManagement />,
  },
  {
    path: "*",
    element: <div>Not Found</div>,
  },
];
