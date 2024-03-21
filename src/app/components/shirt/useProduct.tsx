import { useMutation } from "@tanstack/react-query";
import axios from "@/service/axiosInstance";
type ProductData = {
  imgLogo: any;
  imgProduct: string;
  name: string;
  groupId: number;
  subtitle: string;
  description: string;
  imgListProduct: {
    white: string;
    beige: string;
    red: string;
    blue: string;
    black: string;
  };
  colorsSelected: {
    white: boolean;
    beige: boolean;
    red: boolean;
    blue: boolean;
    black: boolean;
  };
  product: string;
  x: number;
  y: number;
  angle: number;
  scale: number;
  type: string;
  tags: string[];
};

const postProductData = async (data: ProductData) => {
  const res = await axios.post("product/create", data).then((res) => {
    return res;
  });

  return res;
};

export const useProduct = () => {
  return useMutation((data: ProductData) => postProductData(data), {});
};
