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
import Cropper from "react-easy-crop";
import BeatLoader from "react-spinners/BeatLoader";
import getCroppedImg from "./cropImage";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const Profile = () => {
  const [operationFor, setOperationFor] = useState(""); // Can be either banner or avatar
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [urlImage, setUrlImage] = useState(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { mutate: updateProfile, isSuccess } = useUpdateProfile();
  const onSubmit = (data: any) => updateProfile(data);

  const { refetch, data, isLoading } = useGetProfile();
  const { mutate: uploadAvatar, isSuccess: isSuccessAvatar, isLoading: isLoadingAvatar } =
    useUploadAvatar();
  const { mutate: uploadBanner, isSuccess: isSuccessBanner, isLoading: isLoadingBanner } =
    useUploadBanner();

  const {
    getInputProps: getInputPropsBanner,
    acceptedFiles: acceptedFilesBanner,
    getRootProps: getRootPropsBanner,
    fileRejections: fileRejectionsBanner
  } = useDropzone({
    multiple: false,
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFilesBanner) => {
      if (acceptedFilesBanner[0]) {
        setUrlImage(URL.createObjectURL(acceptedFilesBanner[0]));
        setOperationFor("banner")
      }
    },
  });

  const {
    getInputProps: getInputPropsAvatar,
    acceptedFiles: acceptedFilesAvatar,
    getRootProps: getRootPropsAvatar,
    fileRejections: fileRejectionsAvatar
  } = useDropzone({
    multiple: false,
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFilesAvatar) => {
      if (acceptedFilesAvatar[0]) {
        setUrlImage(URL.createObjectURL(acceptedFilesAvatar[0]));
        setOperationFor("avatar")
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
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const showCroppedImage = async () => {
    try {
      const croppedImage = await getCroppedImg(urlImage, croppedAreaPixels);
      fetch(croppedImage)
        .then((res) => res.blob())
        .then((blob) => {
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = function () {
            const base64data = reader.result;
            const formData = new FormData();
            if (operationFor === "banner") {
              formData.append("banner", base64data);
              uploadBanner(formData);
            } else if (operationFor === "avatar") {
              formData.append("avatar", base64data);
              uploadAvatar(formData);
            }
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
        <form>
          <figure
            style={{
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
              position: "relative",  // Make the banner container relative
              width: "100%",
              maxWidth: "1200px", // Optional maximum width
              height: "0",
              paddingTop: "25%", // Aspect ratio control (e.g., 25% for 4:1 ratio)
              margin: "0 auto",
              backgroundImage: data?.data.getArtist.banner
                ? `url(${data?.data.getArtist.banner})`
                : "url(https://assets.ghost.io/admin/1585/assets/img/user-cover-e8f42b12b5fcba292a8b5dfa81e13dd2.png)",
            }}
          >
            {/* Avatar Container */}
            <div
              style={{
                position: "absolute",
                top: "100%",  // Position at the bottom of the banner
                left: "50%",
                transform: "translate(-50%, -50%)",  // Center the avatar horizontally and move it up vertically
                width: "15vw",  // Responsive width relative to viewport width
                maxWidth: "150px",  // Maximum width for the avatar
                height: "15vw",  // Responsive height, keeping it square
                maxHeight: "150px",  // Maximum height for the avatar
                borderRadius: "50%",  // Ensure it's a circle
                backgroundColor: "#fff",  // Optional background color for avatar container
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                className={`bg-cover bg-center rounded-full`}
                style={{
                  backgroundImage: data?.data.getArtist.avatar
                    ? `url(${data?.data.getArtist.avatar})`
                    : "url(https://assets.ghost.io/admin/1585/assets/img/user-image-639a88b784fb5f10964be8b975ca9fdf.png)",
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",  // Ensures the avatar itself is a circle
                }}
              ></div>
            </div>
          </figure>

          {/* Dialog Trigger Buttons */}
          <div className="flex w-full mt-16 sm:mt-24 md:mt-24 justify-center space-x-4">
            <Dialog>
              <DialogTrigger className="text-white bg-black px-4 py-2 rounded">Change cover</DialogTrigger>
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
                      {acceptedFilesBanner.length > 0 ? (
                        <span className="flex justify-center">{acceptedFilesBanner[0].path}</span>
                      ) : fileRejectionsBanner.length > 0 &&
                        fileRejectionsBanner[0].errors[0].code === "file-too-large" ? (
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
            <Dialog>
              <DialogTrigger className="text-white bg-black px-4 py-2 rounded">Change Avatar</DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    <div {...getRootPropsAvatar({ className: "dropzone w-fit text-white bg-black hover:bg-gray-800 cursor-pointer mx-4 my-4 px-4 py-2" })}>
                      <input {...getInputPropsAvatar()} />
                      Upload profile photo
                    </div>
                  </DialogTitle>
                  <DialogDescription>
                    <div>
                      {acceptedFilesAvatar.length > 0 ? (
                        <span className="flex justify-center">{acceptedFilesAvatar[0].path}</span>
                      ) : fileRejectionsAvatar.length > 0 &&
                        fileRejectionsAvatar[0].errors[0].code === "file-too-large" ? (
                        <div className="text-red-600 font-bold">
                          File is larger than 30 Mb
                        </div>
                      ) : (
                        ""
                      )}
                      <div className="text-white">Aspect Ratio 1/1</div>
                      <div className="relative h-64">
                        {urlImage && (
                          <Cropper
                            image={urlImage}
                            crop={crop}
                            zoom={zoom}
                            aspect={1 / 1}
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
                          {isLoadingAvatar ? (
                            <BeatLoader loading={isLoadingAvatar} color="white" size={16} />
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
          </div>

          <div className="border border-[#e6e9eb] mt-10 grid grid-rows-1 p-4">
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
