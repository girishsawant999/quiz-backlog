import useLocalStorage from "@/hooks/use-localstorage";
import { useToast } from "@/hooks/use-toast";
import React, { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

type TAuthUser = {
  id: number;
  username: string;
  email: string;
  role: string;
  token: string;
} | null;

type TAuthContext = {
  user: TAuthUser;
  login: () => void;
  logout: () => void;
  isLoggedIn: boolean;
};

const AuthContext = createContext<TAuthContext | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useLocalStorage<TAuthUser | null>("user", null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const login = () => {
    setUser({
      id: 1,
      username: "admin",
      email: "test@gmail.com",
      role: "admin",
      token: "123456",
    });
    toast({
      title: "Successfully Logged In",
    });
    navigate("/");
  };

  const logout = () => {
    setUser(null);
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
