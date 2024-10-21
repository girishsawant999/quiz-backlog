import useLocalStorage from "@/hooks/use-localstorage";
import { useToast } from "@/hooks/use-toast";
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
  const { toast } = useToast();
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    try {
      const { data } = await onSignIn(email, password);
      setUser(data.data.user);
      localStorage.setItem("token", data.data.token);
      toast({
        title: "Successfully Logged In",
      });
      navigate("/");
    } catch (error: unknown) {
      toast({
        title: "Failed to Log In",
        description: (error as Error).message,
        variant: "destructive",
      });
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
