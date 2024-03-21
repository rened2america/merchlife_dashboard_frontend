"use client";
import {
  useGetProduct,
  useGetProducts,
  useUpdateProduct,
} from "@/app/dashboard2/products/useProduct";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ReactTags } from "react-tag-autocomplete";
import { TagsInput } from "react-tag-input-component";
import "./edit.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SyncLoader from "react-spinners/SyncLoader";

const EditProduct = ({ params }: { params: { productId: string } }) => {
  const router = useRouter();
  const {
    data,
    isLoading,
    isSuccess: isSuccessGetProduct,
  } = useGetProduct(params.productId);
  const { mutate, isSuccess } = useUpdateProduct();
  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [selected, setSelected] = useState<string[]>([]);
  const onSubmit = (data) => mutate({ ...data, tags: selected });
  console.log(data);

  useEffect(() => {
    if (!isLoading) {
      reset({
        name: data?.data.productFromDb.title,
        description: data?.data.productFromDb.description,
        id: data?.data.productFromDb.id,
      });
      // const tagList = data?.data.productFromDb.tag.map((tag) => tag.value);
      // console.log("se ejecuto", tagList);

      // if (tagList) {
      //   setSelected(tagList);
      // }
    }
  }, [isLoading]);

  // useEffect(() => {
  //   const tagList = data?.data.productFromDb.tag.map((tag) => tag.value);

  //   if (tagList && tagList.length > 0) {
  //     console.log("inside tagList", tagList);
  //     setSelected((prevValue) => {
  //       if (prevValue.length > 0) return prevValue;
  //       return tagList;
  //     });
  //   }
  // }, [data?.data.productFromDb.tag]);

  useEffect(() => {
    if (isSuccessGetProduct) {
      const tagList = data?.data.productFromDb.tag.map((tag) => tag.value);
      console.log("se ejecuto", tagList);

      if (tagList) {
        setSelected(tagList);
      }
    }
  }, [isSuccessGetProduct]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Updated Product", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, [isSuccess]);

  if (isLoading) {
    return (
      <div
        style={{
          height: "100vh",
          width: "100%",
          display: "grid",
          placeItems: "center",
        }}
      >
        <SyncLoader loading={isLoading} color="black" />
      </div>
    );
  }

  return (
    <div
      style={{
        height: "100%",
        display: "grid",
        justifyItems: "center",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateRows: "80px 1fr",
          width: "900px",
          padding: "56px 0",
        }}
      >
        <div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "120px 1fr 128px",
              borderRadius: "8px",
              border: "1px solid rgb(212, 212, 216)",
              padding: "8px 8px",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 2fr",
                placeContent: "center",
                cursor: "pointer",
              }}
              onClick={() => {
                router.push("/dashboard2/products");
              }}
            >
              <div
                style={{
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <ArrowLeftIcon />
              </div>
              <span
                style={{
                  display: "grid",
                  justifyItems: "start",
                }}
              >
                Products
              </span>
            </div>
            <div
              style={{
                fontSize: "24px",
                fontWeight: "500",
                display: "grid",
                alignItems: "center",
              }}
            >
              {data?.data.productFromDb.title}
            </div>
            <div>
              <div
                onClick={handleSubmit(onSubmit)}
                style={{
                  padding: "8px",
                  borderRadius: "8px",
                  backgroundColor: "black",
                  textAlign: "center",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Save
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 400px",
            paddingTop: "16px",
          }}
        >
          <div
            style={{
              overflowY: "auto",
              display: "grid",
              justifyItems: "center",
            }}
          >
            <div
              style={{
                width: "500px",
                border: "1px solid rgb(212, 212, 216)",
                borderRadius: "16px",
                display: "grid",
                justifyItems: "center",
                alignItems: "center",
              }}
            >
              <form
                style={{
                  display: "grid",
                  justifyItems: "center",
                  alignItems: "center",
                  gridTemplateRows: "repeat(auto-fit, 48px)",
                  gap: "16px",
                  marginTop: "16px",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    justifyItems: "start",
                    width: "256px",
                  }}
                >
                  <label htmlFor="name">Title</label>
                  {/* use aria-invalid to indicate field contain error */}
                  <input
                    id="name"
                    style={{
                      width: "100%",
                      border: "1px solid rgb(212, 212, 216)",
                      borderRadius: "8px",
                      padding: "4px 8px",
                      fontSize: "14px",
                    }}
                    aria-invalid={errors.name ? "true" : "false"}
                    {...register("name", {
                      required: true,
                      maxLength: 40,
                      minLength: 8,
                    })}
                  />
                  {/* use role="alert" to announce the error message */}
                  {errors.name && errors.name.type === "required" && (
                    <span role="alert">This is required</span>
                  )}
                  {errors.name && errors.name.type === "maxLength" && (
                    <span role="alert">Max length exceeded</span>
                  )}
                  {errors.name && errors.name.type === "minLength" && (
                    <span role="alert">Min length 8</span>
                  )}
                </div>
                <div
                  style={{
                    width: "256px",
                  }}
                >
                  <label htmlFor="name">Description</label>
                  {/* use aria-invalid to indicate field contain error */}
                  <textarea
                    id="description"
                    style={{
                      width: "100%",
                      height: "80px",
                      resize: "none",
                      border: "1px solid rgb(212, 212, 216)",
                      borderRadius: "8px",
                      padding: "4px 8px",
                      fontSize: "14px",
                    }}
                    aria-invalid={errors.description ? "true" : "false"}
                    {...register("description", {
                      required: false,
                      maxLength: 280,
                    })}
                  />
                  <div>
                    <span
                      style={{
                        fontSize: "14px",
                        fontWeight: "700",
                      }}
                    >
                      {watch("description") ? watch("description").length : "0"}
                    </span>
                    <span
                      style={{
                        fontSize: "14px",
                        fontWeight: "500",
                      }}
                    >
                      /280
                    </span>
                  </div>

                  {/* use role="alert" to announce the error message */}
                  {errors.description &&
                    errors.description.type === "required" && (
                      <span role="alert">This is required</span>
                    )}
                  {errors.description &&
                    errors.description.type === "maxLength" && (
                      <span role="alert">Max length exceeded</span>
                    )}
                </div>

                <div
                  style={{
                    width: "256px",
                  }}
                >
                  <div>Tags</div>
                  {selected && (
                    <TagsInput
                      value={selected}
                      onChange={setSelected}
                      name="fruits"
                      placeHolder="Enter Tags"
                    />
                  )}

                  <p
                    id="custom-tags-description"
                    style={{ color: "gray", fontSize: "13px" }}
                  >
                    <em>Max of 3 tags allowed.</em>
                  </p>
                </div>
              </form>
            </div>
          </div>
          <div
            style={{
              display: "grid",
              justifyItems: "end",
            }}
          >
            <div
              style={{
                display: "grid",
                justifyItems: "center",
                padding: "8px",
                border: "1px solid rgb(212, 212, 216)",
                borderRadius: "24px",
              }}
            >
              <Image
                src={data?.data.productFromDb.design[0].url}
                width="300"
                height="260"
                style={{
                  backgroundColor: "#f5f5f5",
                  borderRadius: "16px",
                }}
                alt={data?.data.productFromDb.title}
              />
              <div>Sizes</div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  // gridTemplateColumns: "48px 48px 48px",
                  gap: "8px",
                }}
              >
                {data?.data.productFromDb.sizes &&
                  data?.data.productFromDb.sizes.map((size) => {
                    return (
                      <div
                        key={size.id}
                        style={{
                          width: "48px",
                          height: "24px",
                          border: "1px solid black",
                          display: "grid",
                          placeContent: "center",
                          borderRadius: "8px",
                        }}
                      >
                        {size.value}
                      </div>
                    );
                  })}
              </div>
              <div> Color</div>
              <div
                style={{
                  display: "flex",
                  fontSize: "14px",
                  // gridTemplateColumns: "repeat(auto-fit , minmax(48px, 1fr))",
                  flexDirection: "row",
                  gap: "8px",
                }}
              >
                {data?.data.productFromDb.sizes &&
                  data?.data.productFromDb.colors.map((color) => {
                    return (
                      <div
                        key={color.id}
                        style={{
                          width: "48px",
                          height: "24px",
                          border: "1px solid black",
                          display: "grid",
                          placeContent: "center",
                          borderRadius: "8px",
                        }}
                      >
                        {color.value}
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EditProduct;
