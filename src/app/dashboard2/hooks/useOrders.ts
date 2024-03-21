import { useQuery } from "@tanstack/react-query";
import axios from "@/service/axiosInstance";

const getOrders = async () => {
  const res = await axios.get("product/infoorders/orders").then((res) => {
    return res;
  });
  return res;
};

export const useGetOrders = () => {
  return useQuery(["orders"], getOrders);
};
