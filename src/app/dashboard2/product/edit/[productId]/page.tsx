"use client";
import {
  useGetProduct,
  useUpdateProduct,
} from "@/app/dashboard2/products/useProduct";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TagsInput } from "react-tag-input-component";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Radio, RadioGroup } from "@headlessui/react";
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
  const onSubmit = (data:any) => mutate({ ...data, tags: selected });
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    if (!isLoading) {
      reset({
        name: data?.data.productFromDb.title,
        description: data?.data.productFromDb.description,
        id: data?.data.productFromDb.id,
      });
    }
  }, [isLoading]);

  useEffect(() => {
    if (isSuccessGetProduct) {
      const tagList = data?.data.productFromDb.tag.map((tag:any) => tag.value);
      if (tagList) {
        setSelected(tagList);
      }
      setSelectedColor(data?.data.productFromDb.colors[0]);
      setSelectedSize(data?.data.productFromDb.sizes[0]);
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
      <div className="h-screen w-full grid place-items-center">
        <SyncLoader loading={isLoading} color="black" />
      </div>
    );
  }

  function classNames(...classes:string[]) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg p-8  ">
        <div className="flex justify-between items-center  mb-8">
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => router.push("/dashboard2/products")}
          >
            <ArrowLeftIcon className="w-6 h-6" />
            <span className="text-lg">Products</span>
            <h2 className="text-xl font-bold">/{data?.data.productFromDb.title}</h2>

          </div>
          <button
             onClick={handleSubmit(onSubmit)}
            className="px-4 py-2 bg-black text-white rounded-lg"
          >
            Save
          </button>
        </div>
       
        <div className="grid w-full grid-cols-1 lg:grid-cols-12 items-start gap-x-6 gap-y-8 sm:grid-cols-24 lg:gap-x-8">
          <div className="aspect-h-3 aspect-w-2 overflow-hidden h-full rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
            <Image
              src={data?.data.productFromDb.design[0].url}
              width="700"
              height="700"
              className="object-fill object-center h-full"
              alt={data?.data.productFromDb.title}
            />
          </div>
          <div className="sm:col-span-8 lg:col-span-7">
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 "
                >
                  Title
                </label>
                <input
                  id="name"
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm mt-1"
                  aria-invalid={errors.name ? "true" : "false"}
                  {...register("name", {
                    required: true,
                    maxLength: 40,
                    minLength: 8,
                  })}
                />
                {errors.name && errors.name.type === "required" && (
                  <span role="alert" className="text-red-500 text-sm">
                    This is required
                  </span>
                )}
                {errors.name && errors.name.type === "maxLength" && (
                  <span role="alert" className="text-red-500 text-sm">
                    Max length exceeded
                  </span>
                )}
                {errors.name && errors.name.type === "minLength" && (
                  <span role="alert" className="text-red-500 text-sm">
                    Min length 8
                  </span>
                )}
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  className="w-full h-24 resize-none border border-gray-300 rounded-lg p-2 text-sm mt-1"
                  aria-invalid={errors.description ? "true" : "false"}
                  {...register("description", {
                    required: false,
                    maxLength: 280,
                  })}
                />
                <div className="text-right text-sm text-gray-500 mt-1">
                  <span className="font-bold">
                    {watch("description") ? watch("description").length : "0"}
                  </span>
                  /280
                </div>
                {errors.description && errors.description.type === "maxLength" && (
                  <span role="alert" className="text-red-500 text-sm">
                    Max length exceeded
                  </span>
                )}
              </div>
              <div className=" m-0">
                <label className=" m-0 block text-sm font-medium text-gray-700">
                  Tags
                </label>
                {selected && (
                  <TagsInput
                    value={selected}
                    onChange={setSelected}
                    name="tags"
                    placeHolder="Enter Tags"
                  />
                )}
                <p
                  id="custom-tags-description"
                  className="text-gray-500 text-sm mt-1"
                >
                  <em>Max of 3 tags allowed.</em>
                </p>
              </div>
            </form>
            <fieldset aria-label="Choose a color" className="mt-4">
              <legend className="text-sm font-medium text-gray-900">Color</legend>

              <RadioGroup
                value={selectedColor}
                onChange={setSelectedColor}
                className="mt-4 flex items-center space-x-3"
              >
                {data?.data.productFromDb.colors &&
                  data?.data.productFromDb.colors.map((color:any) => (
                    <Radio
                      key={color.id}
                      value={color}
                      aria-label={color.value}
                      className="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none data-[checked]:ring-2 data-[focus]:data-[checked]:ring data-[focus]:data-[checked]:ring-offset-1"
                    >
                      <span
                        aria-hidden="true"
                        style={{ backgroundColor: color.value }}
                        className=" h-8 w-8 rounded-full border border-opacity-10"
                      />
                    </Radio>
                  ))}
              </RadioGroup>
            </fieldset>
            <fieldset aria-label="Choose a size" className="mt-10">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-gray-900">Size</div>
                <a
                  href="#"
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Size guide
                </a>
              </div>

              <RadioGroup
                value={selectedSize}
                onChange={setSelectedSize}
                className="mt-4 grid grid-cols-4 gap-4"
              >
                {data?.data.productFromDb.sizes &&
                  data?.data.productFromDb.sizes.map((size:any) => (
                    <Radio
                      key={size.id}
                      value={size.value}
                      className="cursor-pointer bg-white text-gray-900 shadow-sm group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none data-[focus]:ring-2 data-[focus]:ring-indigo-500 sm:flex-1"
                    >
                      <span>{size.value}</span>
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute -inset-px rounded-md border-2 border-transparent group-data-[focus]:border group-data-[checked]:border-indigo-500"
                      />
                    </Radio>
                  ))}
              </RadioGroup>
            </fieldset>
          
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EditProduct;
