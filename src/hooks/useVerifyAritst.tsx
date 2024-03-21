import { useQuery } from "@tanstack/react-query";
import axios from "@/service/axiosInstance";
import { String } from "aws-sdk/clients/acm";

const getVerifyArtist = async (token: String) => {
  const res = await axios.get(`artist/verify/${token}`).then((res) => {
    return res;
  });
  console.log(res);
  return res;
};

export const useGetVerifyArtist = (token: string) => {
  console.log(token);
  return useQuery(["verifyartist"], () => getVerifyArtist(token));
};
