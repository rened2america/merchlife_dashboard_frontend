"use client";
import {
  useGetProduct,
  useUpdateProduct,
} from "@/app/dashboard/products/useProduct";
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
  const onSubmit = (data: any) => mutate({ ...data, tags: selected });

  // Initialize selectedColor as a string
  const [selectedColor, setSelectedColor] = useState<string>("White");

  // Get product types
  const productTypes = data?.data.productFromDb.types.map((type: any) =>
    type.value.toLowerCase()
  );

  // Check if the product is a poster or canvas
  const isPosterOrCanvas =
    productTypes?.includes("poster") || productTypes?.includes("canvas");

  // Adjust selectedDesign calculation
  let selectedDesign;

  if (isPosterOrCanvas) {
    // For posters or canvases, use the first design available
    selectedDesign = data?.data.productFromDb.design[0];
  } else {
    // For other products, find the design based on selectedColor
    selectedDesign = data?.data.productFromDb.design.find(
      (designItem: any) =>
        designItem.variant.toLowerCase() === selectedColor.toLowerCase()
    );
  }

  // Adjust availableSizes calculation
  let availableSizes;

  if (isPosterOrCanvas) {
    // For posters or canvases, get all unique sizes
    availableSizes = [
      ...new Set(
        data?.data.productFromDb.design.map(
          (designItem: any) => designItem.size
        )
      ),
    ];
  } else {
    // For other products, get sizes based on selected color
    availableSizes = data?.data.productFromDb.design
      .filter(
        (designItem: any) =>
          designItem.variant.toLowerCase() === selectedColor.toLowerCase()
      )
      .map((designItem: any) => designItem.size);

    availableSizes = [...new Set(availableSizes)];
  }

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
      const tagList = data?.data.productFromDb.tag.map((tag: any) => tag.value);
      if (tagList) {
        setSelected(tagList);
      }
      // Set the default selected color
      if (!isPosterOrCanvas) {
        setSelectedColor(data?.data.productFromDb.colors[0].value);
      }
    }
  }, [isSuccessGetProduct, data]);

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

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg p-8">
        <div className="flex justify-between items-center mb-8">
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => router.push("/dashboard/products")}
          >
            <ArrowLeftIcon className="w-6 h-6" />
            <span className="text-lg">Products</span>
            <h2 className="text-xl font-bold">
              /{data?.data.productFromDb.title}
            </h2>
          </div>
          <button
            onClick={handleSubmit(onSubmit)}
            className="px-4 py-2 bg-black text-white rounded-lg"
          >
            Save
          </button>
        </div>

        <div className="grid w-full grid-cols-1 lg:grid-cols-12 items-start gap-x-6 gap-y-8 sm:grid-cols-24 lg:gap-x-8">
          <div className="overflow-hidden h-full rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
            <Image
              src={selectedDesign?.url}
              width={700}
              height={700}
              className="object-contain object-center w-full h-full"
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
                {errors.description &&
                  errors.description.type === "maxLength" && (
                    <span role="alert" className="text-red-500 text-sm">
                      Max length exceeded
                    </span>
                  )}
              </div>
              <div className="m-0">
                <label className="m-0 block text-sm font-medium text-gray-700">
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

            {/* Conditionally render color selection */}
            {!isPosterOrCanvas && (
              <fieldset aria-label="Choose a color" className="mt-4">
                <legend className="text-sm font-medium text-gray-900">Color</legend>

                <RadioGroup
                  value={selectedColor}
                  onChange={setSelectedColor}
                  className="mt-4 flex items-center space-x-3"
                >
                  {data?.data.productFromDb.colors &&
                    data?.data.productFromDb.colors.map((color: any) => (
                      <Radio
                        key={color.id}
                        value={color.value}
                        aria-label={color.value}
                        className={classNames(
                          selectedColor === color.value
                            ? "ring-2 ring-offset-1 ring-black"
                            : "",
                          "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"
                        )}
                      >
                        <span
                          aria-hidden="true"
                          style={{ backgroundColor: color.value.toLowerCase() }}
                          className="h-8 w-8 rounded-full border border-black border-opacity-10"
                        />
                      </Radio>
                    ))}
                </RadioGroup>
              </fieldset>
            )}

            {/* Display Available Sizes */}
            <fieldset aria-label="Available sizes" className="mt-10">
              <div className="text-sm font-medium text-gray-900">Available Sizes</div>
              <div className="mt-4 flex flex-wrap gap-2">
                {availableSizes.map((size: string) => (
                  <span
                    key={size}
                    className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium uppercase"
                  >
                    {size}
                  </span>
                ))}
              </div>
            </fieldset>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EditProduct;
