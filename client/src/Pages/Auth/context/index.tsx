import toast from "@/components/Toaster";
import useLocalStorage from "@/hooks/use-localstorage";
import React, { createContext, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { onSignIn } from "../api";

type TAuthContext = {
  user: TAuthUser | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  isLoggedIn: boolean;
  userInRole: (role: TAuthUser["role"] | TAuthUser["role"][]) => boolean;
  userNotInRole: (role: TAuthUser["role"] | TAuthUser["role"][]) => boolean;
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
    } catch (error: unknown) {
      if (
        error &&
        typeof error === "object" &&
        "response" in error &&
        (error.response as { data?: { message?: string } })?.data?.message
      ) {
        toast.error(
          (error.response as { data?: { message?: string } }).data!.message
        );
      } else {
        toast.error("Something went wrong!");
      }
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  const userInRole = useCallback(
    (role: TAuthUser["role"] | TAuthUser["role"][]) => {
      if (Array.isArray(role)) {
        return user?.role ? role.includes(user.role) : false;
      }
      return user?.role === role;
    },
    [user]
  );

  const userNotInRole = useCallback(
    (role: TAuthUser["role"] | TAuthUser["role"][]) => {
      if (Array.isArray(role)) {
        return user?.role ? !role.includes(user.role) : false;
      }
      return user?.role !== role;
    },
    [user]
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isLoggedIn: !!user,
        userInRole,
        userNotInRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }

  return context;
};
