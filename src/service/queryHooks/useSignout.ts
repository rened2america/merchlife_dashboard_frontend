import { useQuery } from "@tanstack/react-query";
import axios from "@/service/axiosInstance";

export const getSignout = async () => {
  const res = await axios.get("auth/signout").then((res) => {
    return res;
  });
  console.log(res);
  return res;
};

export const useGetSignout = () => {
  return useQuery(["signout"], getSignout, {
    enabled: false,
  });
};
