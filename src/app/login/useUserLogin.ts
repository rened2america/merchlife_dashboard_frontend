import { useMutation } from "@tanstack/react-query";
import axios from "../../service/axiosInstance";

type LoginData = {
  email: string;
  password: string;
};

const postUserData = async (data: LoginData) => {
  const res = await axios.post("auth/login", data).then((res) => {
    return res;
  });

  return res;
};

export const useUserLogin = () => {
  return useMutation((data: LoginData) => postUserData(data), {});
};
