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
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Profile = () => {
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
  const { mutate: uploadBanner, isSuccess: isSuccessBanner } =
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
    getRootProps: getRootPropsBanner,
  } = useDropzone({
    multiple: false,
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      console.log("acceptedFiles", acceptedFiles[0]);
      const formData = new FormData();
      formData.append("banner", acceptedFiles[0]);
      uploadBanner(formData);
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
            <div
              style={{
                display: "grid",
                alignItems: "center",
                justifyItems: "center",
                margin: "16px 16px",
                padding: "8px 16px",
                backgroundColor: "rgba(0,0,0,0.5)",
                color: "white",
                position: "absolute",
                borderRadius: "4px",
                cursor: "pointer",
              }}
              {...getRootPropsBanner({ className: "dropzone" })}
            >
              <input {...getInputPropsBanner()} />
              Change cover
            </div>
          </figure>
          <figure
            style={{
              width: "150px",
              height: "150px",
              position: "absolute",
              top: "236px",
              left: "0px",
              right: "0px",
              textAlign: "center",
              margin: "0px auto",
            }}
          >
            <div
              style={{
                backgroundSize: "cover",
                backgroundImage: data?.data.getArtist.avatar
                  ? `url(${data?.data.getArtist.avatar})`
                  : "url(https://assets.ghost.io/admin/1585/assets/img/user-image-639a88b784fb5f10964be8b975ca9fdf.png)",
                width: "100%",
                height: "100%",
                backgroundPosition: "50%",
                borderRadius: "9999px",
                backgroundColor: "white",
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
          <div
            style={{
              border: "1px solid #e6e9eb",
              marginTop: "144px",
              display: "grid",
              gridTemplateRows: "1fr",
              borderRadius: "12px",
              padding: "24px",
            }}
          >
            <div
              style={{
                borderBottom: "1px solid rgba(55, 53, 47, 0.09)",
                fontSize: "16px",
                color: "rgb(55, 53, 47)",
                marginBottom: "24px",
                height: "40px",
                margin: "0 auto",
                width: "100%",
                maxWidth: "540px",
                fontWeight: "700",
              }}
            >
              My profile
            </div>
            <fieldset
              style={{
                maxWidth: "540px",
                display: "grid",
                gridTemplateRows: "100px 100px 100px",
                gap: "16px",
                margin: "16px auto",
                width: "100%",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateRows: "16px 48px 16px",
                  alignItems: "center",
                }}
              >
                <label
                  htmlFor="user-name"
                  style={{
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#15171a",
                  }}
                >
                  Full name
                </label>
                {isLoading ? null : (
                  <input
                    id="user-name"
                    style={{
                      height: "40px",
                      padding: "6px 12px",
                      border: "1px solid #dddedf",
                      borderRadius: "4px",
                      width: "100%",
                    }}
                    {...register("name")}
                    defaultValue={data?.data.getArtist.name}
                  />
                )}
                <p
                  style={{
                    fontSize: "13px",
                    fontWeight: "400",
                    color: "#738393",
                  }}
                >
                  Use your real name so people can recognize you
                </p>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateRows: "16px 48px 16px",
                  alignItems: "center",
                }}
              >
                <label
                  htmlFor="user-name"
                  style={{
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#15171a",
                  }}
                >
                  Email
                </label>
                {isLoading ? null : (
                  <input
                    id="user-name"
                    style={{
                      height: "40px",
                      padding: "6px 12px",
                      border: "1px solid #dddedf",
                      borderRadius: "4px",
                      width: "100%",
                    }}
                    disabled
                    value={data?.data.getArtist.email}
                  />
                )}
                <p
                  style={{
                    fontSize: "13px",
                    fontWeight: "400",
                    color: "#738393",
                  }}
                >
                  Used for notifications
                </p>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateRows: "16px 1fr 16px",
                  alignItems: "center",
                }}
              >
                <label
                  htmlFor="user-name"
                  style={{
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#15171a",
                  }}
                >
                  Bio
                </label>
                <textarea
                  id="user-name"
                  style={{
                    maxHeight: "100px",
                    minHeight: "60px",
                    height: "100%",
                    padding: "6px 12px",
                    border: "1px solid #dddedf",
                    borderRadius: "4px",
                    width: "100%",
                  }}
                  {...register("bio")}
                  defaultValue={data?.data.getArtist.bio}
                />
                <p
                  style={{
                    fontSize: "13px",
                    fontWeight: "400",
                    color: "#738393",
                  }}
                >
                  Recommended: 200 characters
                </p>
              </div>
            </fieldset>

            <div
              style={{
                borderBottom: "1px solid rgba(55, 53, 47, 0.09)",
                fontSize: "16px",
                color: "rgb(55, 53, 47)",
                marginBottom: "24px",
                marginTop: "48px",
                height: "40px",
                margin: "0 auto",
                width: "100%",
                maxWidth: "540px",
                fontWeight: "700",
              }}
            >
              My social media
            </div>
            <fieldset
              style={{
                maxWidth: "540px",
                display: "grid",
                gridTemplateRows: "100px 100px 100px",
                gap: "16px",
                margin: "16px auto",
                width: "100%",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateRows: "16px 48px 16px",
                  alignItems: "center",
                }}
              >
                <label
                  htmlFor="user-name"
                  style={{
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#15171a",
                  }}
                >
                  Instagram
                </label>
                {isLoading ? null : (
                  <input
                    id="user-name"
                    style={{
                      height: "40px",
                      padding: "6px 12px",
                      border: "1px solid #dddedf",
                      borderRadius: "4px",
                      width: "100%",
                    }}
                    {...register("instagram")}
                    defaultValue={data?.data.getArtist.instagram}
                  />
                )}
                <p
                  style={{
                    fontSize: "13px",
                    fontWeight: "400",
                    color: "#738393",
                  }}
                >
                  URL of your personal Instagram
                </p>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateRows: "16px 48px 16px",
                  alignItems: "center",
                }}
              >
                <label
                  htmlFor="user-name"
                  style={{
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#15171a",
                  }}
                >
                  Facebook
                </label>
                {isLoading ? null : (
                  <input
                    id="user-name"
                    style={{
                      height: "40px",
                      padding: "6px 12px",
                      border: "1px solid #dddedf",
                      borderRadius: "4px",
                      width: "100%",
                    }}
                    {...register("facebook")}
                    defaultValue={data?.data.getArtist.facebook}
                  />
                )}
                <p
                  style={{
                    fontSize: "13px",
                    fontWeight: "400",
                    color: "#738393",
                  }}
                >
                  URL of your personal Facebook
                </p>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateRows: "16px 48px 16px",
                  alignItems: "center",
                }}
              >
                <label
                  htmlFor="user-name"
                  style={{
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#15171a",
                  }}
                >
                  Twitter
                </label>
                {isLoading ? null : (
                  <input
                    id="user-name"
                    style={{
                      height: "40px",
                      padding: "6px 12px",
                      border: "1px solid #dddedf",
                      borderRadius: "4px",
                      width: "100%",
                    }}
                    {...register("twitter")}
                    defaultValue={data?.data.getArtist.twitter}
                  />
                )}
                <p
                  style={{
                    fontSize: "13px",
                    fontWeight: "400",
                    color: "#738393",
                  }}
                >
                  URL of your personal twitter
                </p>
              </div>
            </fieldset>
          </div>
        </form>
        <form></form>
      </section>
      <div
        style={{
          display: "grid",
          alignItems: "center",
          justifyItems: "center",
          width: "88px",
          height: "40px",
          position: "fixed",
          bottom: "24px",
          right: "64px",
          backgroundColor: "black",
          borderRadius: "8px",
          color: "white",
          fontSize: "14px",
          fontWeight: "700",
          cursor: "pointer",
        }}
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
