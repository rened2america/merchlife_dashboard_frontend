import { fetchInstance } from "./fetchConfig";
import { cookies } from "next/headers";

type Product = {
  id: string;
};
export const getProducts = async () => {
  const cStore = cookies();
  const cookees = cStore.getAll();
  console.log("cookees", cookees);
  const getAllProducts: any = await fetchInstance().get("product/all");
  console.log(getAllProducts);
  return {
    isAuth: getAllProducts?.isAuth,
    products: getAllProducts?.data,
  };
};
