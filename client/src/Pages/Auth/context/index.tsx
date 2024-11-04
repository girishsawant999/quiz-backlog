import toast from "@/components/Toaster";
import useLocalStorage from "@/hooks/use-localstorage";
import React, { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { onSignIn } from "../api";

type TAuthContext = {
  user: TAuthUser | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  isLoggedIn: boolean;
};

const AuthContext = createContext<TAuthContext | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useLocalStorage<TAuthUser | null>("user", null);

  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    try {
      const { data } = await onSignIn(email, password);
      setUser(data.data.user);
      localStorage.setItem("token", data.data.token);

      toast.success("Successfully Logged In");
      navigate("/");
    } catch (error: any) {
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong!");
      }
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
