import {
  MenuPropertiesLayout,
  MenuPropertiesLayoutTitle,
} from "@/common/layouts/PageLayout/MenuPropertiesLayout";
import { useProductStore } from "@/store/productStore";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TagsInput } from "react-tag-input-component";
import "../../../../app/dashboard2/product/edit/[productId]/edit.css";
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
  const updateDescription = useProductStore((state) => state.updateDescription);
  const name = useProductStore((state) => state.name);
  const description = useProductStore((state) => state.description);
  return (
    <MenuPropertiesLayout>
      <MenuPropertiesLayoutTitle>Product</MenuPropertiesLayoutTitle>
      <div
        style={{
          display: "grid",
          gridTemplateRows: "1fr 232px",
          overflowY: "auto",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateRows: "32px 72px 120px 1fr",
            justifyItems: "center",
            alignItems: "center",
            padding: "8px 16px",
            gap: "8px",
          }}
        >
          <div>Properties</div>
          <div
            style={{
              display: "grid",
              justifyItems: "start",
              width: "100%",
            }}
          >
            <label
              style={{
                fontSize: "13px",
                fontWeight: "700",
              }}
              htmlFor="name"
            >
              Title
            </label>
            {/* use aria-invalid to indicate field contain error */}
            <input
              onChange={(e) => {
                updateName(e.target.value);
              }}
              value={name}
              id="name"
              style={{
                width: "100%",
                border: "1px solid rgb(212, 212, 216)",
                borderRadius: "8px",
                padding: "4px 8px",
                fontSize: "14px",
              }}
            />
          </div>
          <div
            style={{
              width: "100%",
            }}
          >
            <label
              style={{
                fontSize: "13px",
                fontWeight: "700",
              }}
              htmlFor="description"
            >
              Description
            </label>
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
                onChange: (e) => {
                  updateDescription(e.target.value);
                },
                value: name,
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
            {errors.description && errors.description.type === "required" && (
              <span role="alert">This is required</span>
            )}
            {errors.description && errors.description.type === "maxLength" && (
              <span role="alert">Max length exceeded</span>
            )}
          </div>

          <div
            style={{
              width: "100%",
            }}
          >
            <div
              style={{
                fontSize: "13px",
                fontWeight: "700",
              }}
            >
              Tags
            </div>
            <TagsInput
              value={tags}
              onChange={updateTags}
              name="fruits"
              placeHolder="Enter Tags"
            />
            <p
              id="custom-tags-description"
              style={{ color: "gray", fontSize: "13px" }}
            >
              <em>Max of 3 tags allowed.</em>
            </p>
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateRows: "50px 1fr",
            justifyItems: "center",
            alignItems: "start",
          }}
        >
          <div>Select Product</div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "100px 100px",
              gridTemplateRows: "100px 100px",
              height: "100px",
              alignItems: "center",
              justifyItems: "center",
            }}
          >
            <div
              style={{
                border: selectModel === "Shirt" ? "1px solid black" : "none",
                width: "90%",
                height: "90%",
                display: "grid",
                alignItems: "center",
                justifyItems: "center",
                borderRadius: "999px",
              }}
              onClick={() => {
                updateSelectModel("Shirt");
              }}
            >
              <img width="80px" src="/shirtModel.png" alt="" />
            </div>
            <div
              style={{
                border: selectModel === "Hoodie" ? "1px solid black" : "none",
                width: "90%",
                height: "90%",
                display: "grid",
                alignItems: "center",
                justifyItems: "center",
                borderRadius: "999px",
              }}
              onClick={() => {
                updateSelectModel("Hoodie");
              }}
            >
              <img width="80px" src="/hoodieModel.png" alt="" />
            </div>
            <div
              style={{
                border: selectModel === "Mug" ? "1px solid black" : "none",
                width: "90%",
                height: "90%",
                display: "grid",
                alignItems: "center",
                justifyItems: "center",
                borderRadius: "999px",
              }}
              onClick={() => {
                updateSelectModel("Mug");
              }}
            >
              <img
                style={{
                  borderRadius: "80px",
                }}
                width="80px"
                src="/mug.png"
                alt="mug"
              />
            </div>
            <div
              style={{
                border:
                  selectModel === "Sweatshirt" ? "1px solid black" : "none",
                width: "90%",
                height: "90%",
                display: "grid",
                alignItems: "center",
                justifyItems: "center",
                borderRadius: "999px",
              }}
              onClick={() => {
                updateSelectModel("Sweatshirt");
              }}
            >
              <img
                style={{
                  borderRadius: "80px",
                }}
                width="80px"
                src="/sweatShirt.png"
                alt="Sweatshirt"
              />
            </div>
          </div>
        </div>
      </div>
    </MenuPropertiesLayout>
  );
};
