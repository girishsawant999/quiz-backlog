import { apiInstance } from "@/helpers/api";

export const onSignIn = async (email: string, password: string) => {
  return await apiInstance.post<TResponse<{ user: TAuthUser; token: string }>>(
    "/auth/login",
    { email, password }
  );
};
