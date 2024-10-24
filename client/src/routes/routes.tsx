import SignIn from "@/Pages/Auth/SignIn";
import DashBoard from "@/Pages/DashBoard";
import Questions from "@/Pages/Questions";
import Users from "@/Pages/Users";

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
    element: <Users />,
  },
  {
    path: "/questions/*",
    element: <Questions />,
  },
  {
    path: "*",
    element: <div>Not Found</div>,
  },
];
