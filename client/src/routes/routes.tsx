import SignIn from "@/Pages/Auth/SignIn";
import DashBoard from "@/Pages/DashBoard";
import Questions from "@/Pages/Questions";
import Users from "@/Pages/Users";
import { Navigate } from "react-router-dom";

export const PUBLIC_ROUTES = [
  {
    path: "/sign-in",
    element: <SignIn />,
  },
];

export const PRIVATE_ROUTES = [
  {
    path: "/",
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: "/dashboard",
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
