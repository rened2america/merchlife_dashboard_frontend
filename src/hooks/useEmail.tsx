import { useQuery } from "@tanstack/react-query";
import axios from "@/service/axiosInstance";
import { String } from "aws-sdk/clients/acm";

const getEmailConfirm = async (token: String) => {
  const res = await axios.get(`artist/${token}`).then((res) => {
    return res;
  });
  console.log(res);
  return res;
};

export const useGetEmailConfirm = (token: string) => {
  console.log(token);
  return useQuery(["emailconfirm"], () => getEmailConfirm(token));
};
