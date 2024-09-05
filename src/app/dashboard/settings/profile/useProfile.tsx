import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "@/service/axiosInstance";

const postUploadAvatar = async (data: any) => {
  const res = await axios
    .post("artist/upload/avatar", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      return res;
    });

  return res;
};

export const useUploadAvatar = () => {
  return useMutation((data: any) => postUploadAvatar(data), {});
};

const postUploadBanner = async (data: any) => {
  const res = await axios
    .post("artist/upload/banner", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      return res;
    });

  return res;
};

export const useUploadBanner = () => {
  return useMutation((data: any) => postUploadBanner(data), {});
};

const getProfile = async () => {
  const res = await axios.get("artist/profile").then((res) => {
    return res;
  });
  console.log(res);
  return res;
};

export const useGetProfile = () => {
  return useQuery(["profile"], getProfile, {
    refetchOnWindowFocus: false,
  });
};

const putUpdateProfile = async (data: any) => {
  const res = await axios.put("artist/profile", data).then((res) => {
    return res;
  });

  return res;
};

export const useUpdateProfile = () => {
  return useMutation((data: any) => putUpdateProfile(data), {});
};
