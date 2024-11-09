import { useAuthContext } from "@/Pages/Auth/context";
import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRouteWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isLoggedIn } = useAuthContext();

  return isLoggedIn ? children : <Navigate to="/sign-in" />;
};

export default PrivateRouteWrapper;
