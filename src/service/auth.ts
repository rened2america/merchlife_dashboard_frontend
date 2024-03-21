import { fetchInstance } from "./fetchConfig";

export const login = async () => {
  const isLogged = await fetchInstance().get("auth/login");
  return isLogged;
};
