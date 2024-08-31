"use client";
import { PageTitle } from "@/common/components/generic/PageTitle/PageTitle";
import { PageLayout } from "@/common/layouts/PageLayout/PageLayout";
import { useDropzone } from "react-dropzone";
import {
  useGetProfile,
  useUpdateProfile,
  useUploadAvatar,
  useUploadBanner,
} from "./useProfile";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IconUpload } from "@/common/components/icons/IconUpload";
import Cropper from "react-easy-crop";
import BeatLoader from "react-spinners/BeatLoader";
import getCroppedImg from "./cropImage";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const Profile = () => {
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [urlImage, setUrlImage] = useState(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { mutate: updateProfile, isSuccess } = useUpdateProfile();
  const onSubmit = (data: any) => updateProfile(data);

  const { refetch, data, isLoading } = useGetProfile();
  const { mutate: uploadAvatar, isSuccess: isSuccessAvatar } =
    useUploadAvatar();
  const { mutate: uploadBanner, isSuccess: isSuccessBanner, isLoading: isLoadingBanner } =
    useUploadBanner();
  const {
    getInputProps: getInputPropsAvatar,
    getRootProps: getRootPropsAvatar,
  } = useDropzone({
    multiple: false,
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      console.log("acceptedFiles", acceptedFiles[0]);
      const formData = new FormData();
      formData.append("avatar", acceptedFiles[0]);
      uploadAvatar(formData);
    },
  });

  const {
    getInputProps: getInputPropsBanner,
    acceptedFiles,
    getRootProps: getRootPropsBanner,
    fileRejections
  } = useDropzone({
    multiple: false,
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      console.log("acceptedFiles", acceptedFiles[0]);
      if (acceptedFiles[0]) {
        setUrlImage(URL.createObjectURL(acceptedFiles[0]));
        setSelectedBanner(acceptedFiles[0]);
      }
    },
  });
  useEffect(() => {
    refetch();
  }, [isSuccessAvatar, isSuccessBanner]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Updated profile ", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [isSuccess]);

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels);
    setCroppedAreaPixels(croppedAreaPixels);

  }

  const showCroppedImage = async () => {
    try {
      const croppedImage = await getCroppedImg(urlImage, croppedAreaPixels);
      console.log("croppedImage", croppedImage);
      fetch(croppedImage)
        .then((res) => res.blob())
        .then((blob) => {
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = function () {
            const base64data = reader.result;
            const formData = new FormData();
            formData.append("banner", base64data);
            console.log("banner", base64data)
            uploadBanner(formData);
          };
        });
      setUrlImage(croppedImage);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <PageLayout>
      <PageTitle>{data?.data.getArtist.name}</PageTitle>
      <section>
        <form
          style={{
            position: "relative",
            display: "grid",
            gridTemplateRows: "300px 1fr",
          }}
        >
          <figure
            style={{
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              position: "relative",
              backgroundImage: data?.data.getArtist.banner
                ? `url(${data?.data.getArtist.banner})`
                : "url(https://assets.ghost.io/admin/1585/assets/img/user-cover-e8f42b12b5fcba292a8b5dfa81e13dd2.png)",
            }}
          >
            <Dialog>
              <DialogTrigger className="text-white bg-black mx-4 my-4 px-4 py-2 ">Change cover</DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    <div {...getRootPropsBanner({ className: "dropzone w-40 text-white bg-black hover:bg-gray-800 cursor-pointer mx-4 my-4 px-4 py-2" })}>
                      <input {...getInputPropsBanner()} />
                      Upload Banner
                    </div>
                  </DialogTitle>
                  <DialogDescription>
                    <div>
                      {acceptedFiles.length > 0 ? (
                        <span className="flex justify-center">{acceptedFiles[0].path}</span>
                      ) : fileRejections.length > 0 &&
                        fileRejections[0].errors[0].code === "file-too-large" ? (
                        <div className="text-red-600 font-bold">
                          File is larger than 30 Mb
                        </div>
                      ) : (
                        ""
                      )}
                      <div className="text-white">Aspect Ratio 5/2</div>
                      <div className="relative h-64">
                        {urlImage && (
                          <Cropper
                            image={urlImage}
                            crop={crop}
                            zoom={zoom}
                            aspect={5 / 2}
                            onCropChange={setCrop}
                            onCropComplete={onCropComplete}
                            onZoomChange={setZoom}
                          />
                        )}
                      </div>
                      <input
                        type="range"
                        value={zoom}
                        min={1}
                        max={3}
                        step={0.1}
                        onChange={(e) => setZoom(e.target.value)}
                        className="w-full mt-2"
                      />
                      <div className="flex justify-center mt-4">
                        <button
                          onClick={showCroppedImage}
                          className="p-2 text-sm font-medium text-white bg-blue-600 rounded border border-blue-600 hover:bg-blue-700"
                        >
                          {isLoadingBanner ? (
                            <BeatLoader loading={isLoadingBanner} color="white" size={16} />
                          ) : (
                            "Confirm"
                          )}
                        </button>
                      </div>
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>

          </figure>
          <figure className="w-[150px] h-[150px] absolute top-[236px] left-0 right-0 text-center my-0 mx-auto">
            <div
              className={`bg-cover bg-center rounded-full bg-white w-full h-full`}
              style={{
                backgroundImage: data?.data.getArtist.avatar
                  ? `url(${data?.data.getArtist.avatar})`
                  : "url(https://assets.ghost.io/admin/1585/assets/img/user-image-639a88b784fb5f10964be8b975ca9fdf.png)",
              }}
            ></div>

            <div
              style={{
                display: "grid",
                alignItems: "center",
                justifyItems: "center",
                padding: "8px 16px",
                backgroundColor: "rgba(0,0,0,0.5)",
                color: "white",
                borderRadius: "4px",
                marginTop: "8px",
                cursor: "pointer",
              }}
              {...getRootPropsAvatar({ className: "dropzone" })}
            >
              <input {...getInputPropsAvatar()} />
              Change image
            </div>
          </figure>
          <div className="border border-[#e6e9eb] mt-[144px] grid grid-rows-1 rounded-[12px] p-[24px]">
            <div className="border-b border-[#37352f1a] text-[16px] text-[#37352f] mb-[24px] h-[40px] mx-auto w-full max-w-[540px] font-bold">
              My profile
            </div>
            <fieldset className="max-w-[540px] grid grid-rows-[100px_100px_100px] gap-[16px] my-[16px] mx-auto w-full">
              <div className="grid grid-rows-[16px_48px_16px] items-center">
                <label
                  htmlFor="user-name"
                  className="text-[14px] font-medium text-[#15171a]"
                >
                  Full name
                </label>
                {isLoading ? null : (
                  <input
                    id="user-name"
                    className="h-[40px] p-[6px_12px] border border-[#dddedf] rounded w-full"
                    {...register("name")}
                    defaultValue={data?.data.getArtist.name}
                  />
                )}
                <p className="text-[13px] font-normal text-[#738393]">
                  Use your real name so people can recognize you
                </p>
              </div>

              <div className="grid grid-rows-[16px_48px_16px] items-center">
                <label
                  htmlFor="user-email"
                  className="text-[14px] font-medium text-[#15171a]"
                >
                  Email
                </label>
                {isLoading ? null : (
                  <input
                    id="user-email"
                    className="h-[40px] p-[6px_12px] border border-[#dddedf] rounded w-full"
                    disabled
                    value={data?.data.getArtist.email}
                  />
                )}
                <p className="text-[13px] font-normal text-[#738393]">
                  Used for notifications
                </p>
              </div>

              <div className="grid grid-rows-[16px_1fr_16px] items-center">
                <label
                  htmlFor="user-bio"
                  className="text-[14px] font-medium text-[#15171a]"
                >
                  Bio
                </label>
                <textarea
                  id="user-bio"
                  className="max-h-[100px] min-h-[60px] h-full p-[6px_12px] border border-[#dddedf] rounded w-full"
                  {...register("bio")}
                  defaultValue={data?.data.getArtist.bio}
                />
                <p className="text-[13px] font-normal text-[#738393]">
                  Recommended: 200 characters
                </p>
              </div>
            </fieldset>

            <div className="border-b border-gray-200 text-lg text-gray-700 mb-[24px] mt-[48px] h-[40px] mx-auto w-full max-w-[540px] font-bold">
              My social media
            </div>
            <fieldset
              className="max-w-[540px] grid grid-rows-[100px_100px_100px] gap-[16px] my-[16px] mx-auto w-full"
            >
              <div className="grid grid-rows-3 gap-2 items-center">
                <label
                  htmlFor="user-name"
                  className="text-sm font-medium text-gray-700"
                >
                  Instagram
                </label>
                {isLoading ? null : (
                  <input
                    id="user-name"
                    className="h-10 px-3 border border-gray-300 rounded w-full"
                    {...register("instagram")}
                    defaultValue={data?.data.getArtist.instagram}
                  />
                )}
                <p className="text-xs font-normal text-gray-500">
                  URL of your personal Instagram
                </p>
              </div>

              <div className="grid grid-rows-3 gap-2 items-center">
                <label
                  htmlFor="user-name"
                  className="text-sm font-medium text-gray-700"
                >
                  Facebook
                </label>
                {isLoading ? null : (
                  <input
                    id="user-name"
                    className="h-10 px-3 border border-gray-300 rounded w-full"
                    {...register("facebook")}
                    defaultValue={data?.data.getArtist.facebook}
                  />
                )}
                <p className="text-xs font-normal text-gray-500">
                  URL of your personal Facebook
                </p>
              </div>

              <div className="grid grid-rows-3 gap-2 items-center">
                <label
                  htmlFor="user-name"
                  className="text-sm font-medium text-gray-700"
                >
                  Twitter
                </label>
                {isLoading ? null : (
                  <input
                    id="user-name"
                    className="h-10 px-3 border border-gray-300 rounded w-full"
                    {...register("twitter")}
                    defaultValue={data?.data.getArtist.twitter}
                  />
                )}
                <p className="text-xs font-normal text-gray-500">
                  URL of your personal Twitter
                </p>
              </div>
            </fieldset>
          </div>
        </form>
        <form></form>
      </section>
      <div
        className="grid items-center justify-items-center w-[88px] h-[40px] fixed bottom-[24px] right-[64px] bg-black rounded-md text-white text-lg cursor-pointer"
        onClick={handleSubmit(onSubmit)}
      >
        Save
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </PageLayout>
  );
};
export default Profile;
