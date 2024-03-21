import { useQuery } from "@tanstack/react-query";
import axios from "@/service/axiosInstance";

const getProductsData = async () => {
  const res = await axios.get("product/allByUser").then((res) => {
    return res;
  });
  console.log(res);
  return res;
};

export const useGetProducts = () => {
  return useQuery(["products"], getProductsData);
};
