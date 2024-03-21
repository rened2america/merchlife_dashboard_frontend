"use client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { redirect } from "next/navigation";

const queryClient = new QueryClient({
  // defaultOptions: {
  //   queries: {
  //     onError: (error) => {
  //       console.log("error", error);
  //       if (error.response.status === 401) {
  //         console.log(error.response.status);
  //         window.location.replace("http://localhost:3000/login");
  //       }
  //     },
  //   },
  // },
});

export const ReactQueryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
