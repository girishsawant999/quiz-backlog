import { apiInstance } from "@/helpers/api";

export const getUsers = async () => {
  return (await apiInstance.get<{ users: TUser[] }>("user/getUsers")).data
    .users;
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

export const updateUser = async (data: {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  mobile: string;
  role: string;
}) => {
  return apiInstance.post("user/updateUser", data);
};

export const deleteUser = async (_id: string) => {
  return apiInstance.post("user/deleteUser", { _id });
};
