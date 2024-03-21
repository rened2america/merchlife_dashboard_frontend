import { useQuery } from "@tanstack/react-query";
import axios from "@/service/axiosInstance";

const getUserIsLogin = async () => {
  const res = await axios.get("auth/userIsLogin").then((res) => {
    return res;
  });
  console.log(res);
  return res;
};

export const useGetUserIsLogin = () => {
  return useQuery(["userislogin"], getUserIsLogin);
};
