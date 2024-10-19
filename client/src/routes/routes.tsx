import SignIn from "@/Pages/Auth/SignIn";
import DashBoard from "@/Pages/DashBoard";

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
    path: "*",
    element: <div>Not Found</div>,
  },
];
