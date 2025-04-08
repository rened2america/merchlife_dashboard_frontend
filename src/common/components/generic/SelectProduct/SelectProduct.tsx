import {
  MenuPropertiesLayout,
  MenuPropertiesLayoutTitle,
} from "@/common/layouts/PageLayout/MenuPropertiesLayout";
import { minimumPrices, useProductStore } from "@/store/productStore";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TagsInput } from "react-tag-input-component";
import "../../../../app/dashboard/product/edit/[productId]/edit.css";
import Image from "next/image";

export const SelectProduct = () => {
  const updateSubtitle = useProductStore((state) => state.updateSubtitle);
  const subtitle = useProductStore((state) => state.subtitle);
  const updateSelectModel = useProductStore((state) => state.updateSelectModel);
  const selectModel = useProductStore((state) => state.selectModel);

  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [selected, setSelected] = useState<string[]>([]);
  const tags = useProductStore((state) => state.tags);
  const updateTags = useProductStore((state) => state.updateTags);
  const updateName = useProductStore((state) => state.updateName);
  const setPrice = useProductStore((state) => state.setPrice);
  const validateAndUpdatePrice = useProductStore((state) => state.validateAndUpdatePrice);
  const updateDescription = useProductStore((state) => state.updateDescription);
  const name = useProductStore((state) => state.name);
  const price = useProductStore((state) => state.price);
  const description = useProductStore((state) => state.description);
  const updateScale = useProductStore((state) => state.updateScale);
  const updatePosition = useProductStore((state) => state.updatePosition);

  
  return (
    <MenuPropertiesLayout>
      <MenuPropertiesLayoutTitle>Product</MenuPropertiesLayoutTitle>
      <div className="grid grid-rows-[1fr_232px] overflow-y-auto cust-scroll p-4" style={{ scrollbarWidth: 'thin' }}>
        <div className="grid grid-rows-[32px_72px_120px_1fr] justify-items-center w-full items-center gap-8">
          <div className="p-4">Properties</div>
          <div className="grid justify-items-start w-full ">
            <label className="text-sm font-bold" htmlFor="name">Title</label>
            <input
              onChange={(e) => updateName(e.target.value)}
              value={name}
              id="name"
              className="w-full border border-gray-300 rounded-lg p-2 text-base"
            />
            <label className="text-sm font-bold mt-2" htmlFor="price">Price</label>
            <input
              onChange={(e) => setPrice(parseFloat(e.target.value))}
              onBlur={(e) => validateAndUpdatePrice(parseFloat(e.target.value))}
              value={price}
              id="price"
              className="w-full border border-gray-300 rounded-lg p-2 text-base"
              type="number"
              step={0.01}
            />
            <p id="price-description" className="text-gray-500 text-sm">
              <em>Minimum price: {minimumPrices[selectModel]}</em>
            </p>
          </div>
          <div className="w-full mt-8">
            <label className="text-sm font-bold mt-2" htmlFor="description">Description</label>
            <textarea
              id="description"
              className="w-full h-20 resize-none border border-gray-300 rounded-lg p-2 text-base"
              aria-invalid={errors.description ? "true" : "false"}
              {...register("description", {
                onChange: (e) => updateDescription(e.target.value),
                value: name,
                required: false,
                maxLength: 280,
              })}
            />
            <div>
              <span className="text-base font-bold">{watch("description") ? watch("description").length : "0"}</span>
              <span className="text-base font-medium">/280</span>
            </div>
            {errors.description && errors.description.type === "required" && (
              <span role="alert">This is required</span>
            )}
            {errors.description && errors.description.type === "maxLength" && (
              <span role="alert">Max length exceeded</span>
            )}
          </div>
          <div className="w-full">
            <div className="text-sm font-bold">Tags</div>
            <TagsInput
              value={tags}
              onChange={() =>updateTags}
              name="tags"
              placeHolder="Enter Tags"
            />
            <p id="custom-tags-description" className="text-gray-500 text-sm">
              <em>Max of 3 tags allowed.</em>
            </p>
          </div>
        </div>
        <div className="grid grid-rows-[50px_1fr] justify-items-center items-start mt-4">
          <div>Select Product</div>
          <div className="grid grid-cols-2 grid-rows-2  items-center justify-items-center gap-4">
            <div
              className={`border ${selectModel === "Shirt" ? "border-black" : "border-none"} w-[100%] h-[100%] grid items-center justify-items-center rounded-lg`}
              onClick={() => {
                updateScale(0.1);
                updateSelectModel("Shirt")
                updatePosition({x:0,y:0,z:0.1});
              }
              }
            >
              <Image width={80} height={80} src="/shirtModel.png" alt="Shirt" />
            </div>
            <div
              className={`border ${selectModel === "Hoodie" ? "border-black" : "border-none"} w-[100%] h-[100%] grid items-center justify-items-center rounded-lg`}
              onClick={() => {
                updateScale(0.2);
                updateSelectModel("Hoodie");
                updatePosition({x:0,y:10,z:0.1});
              }
              }
            >
              <Image width={80} height={80} src="/hoodieModel.png" alt="Hoodie" />
            </div>
            <div
              className={`border ${selectModel === "Mug" ? "border-black" : "border-none"} w-[100%] h-[100%] grid items-center justify-items-center rounded-lg`}
              onClick={() => {
                updateScale(0.03);
                updateSelectModel("Mug");
                updatePosition({x:0,y:0,z:0.1});
              }
              }
            >
              <Image className="rounded-full" width={80} height={80} src="/mug.png" alt="Mug" />
            </div>
            <div
              className={`border ${selectModel === "Sweatshirt" ? "border-black" : "border-none"} w-[100%] h-[100%] grid items-center justify-items-center rounded-lg`}
              onClick={() => {
                updateScale(0.1);
                updateSelectModel("Sweatshirt");
                updatePosition({x:0,y:0,z:0.1});
              }
              }
            >
              <Image className="rounded-full" width={80} height={80} src="/sweatShirt.png" alt="Sweatshirt" />
            </div>
          </div>
        </div>
      </div>
    </MenuPropertiesLayout>
  );
};
