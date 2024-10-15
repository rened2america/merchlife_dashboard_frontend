import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "@/service/axiosInstance";

const postUploadArt = async (data: any) => {
  const res = await axios
    .post("product/upload/art", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      return res;
    }).catch((error) => {
      console.log("Error occured: ", error)
    })

  return res;
};

export const useUploadArt = () => {
  return useMutation((data: any) => postUploadArt(data), {});
};

const getGallery = async () => {
  const res = await axios.get("product/gallery").then((res) => {
    return res;
  });
  console.log(res);
  return res;
};

export const useGetGallery = () => {
  return useQuery(["gallery"], getGallery);
};
