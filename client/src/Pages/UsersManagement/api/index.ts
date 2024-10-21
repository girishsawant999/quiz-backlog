import apiInstance from "@/helpers/api";

export const getUsers = async () => {
  return apiInstance.get("user/getUsers");
};

export const getUser = async (id: string) => {
  return apiInstance.get(`user/getUser?id=${id}`);
};

export const createUser = async (data: {
  email: string;
  firstName: string;
  lastName: string;
  mobile: string;
  password: string;
  role: string;
}) => {
  return apiInstance.post("user/createUser", data);
};

export const updateUser = async (data: unknown) => {
  return apiInstance.post("user/updateUser", data);
};

export const deleteUser = async (id: string) => {
  return apiInstance.post("user/deleteUser", { id });
};
