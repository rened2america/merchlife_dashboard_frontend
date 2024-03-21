import { useMutation } from "@tanstack/react-query";
import axios from "../../service/axiosInstance";

type RegisterData = {
  name: string;
  email: string;
  password: string;
};

const postUserData = async (data: RegisterData) => {
  const res = await axios.post("auth/create", data).then((res) => {
    return res;
  });

  return res;
};

export const useUserRegister = () => {
  return useMutation((data: RegisterData) => postUserData(data), {});
};
