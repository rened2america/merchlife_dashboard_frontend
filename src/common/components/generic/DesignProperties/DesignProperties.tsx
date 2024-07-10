"use client";
import * as Slider from "@radix-ui/react-slider";
import "./style.css";
import { useProductStore } from "@/store/productStore";
import { IconRounded } from "../../icons/IconRounded";
import {
  MenuPropertiesLayout,
  MenuPropertiesLayoutTitle,
} from "@/common/layouts/PageLayout/MenuPropertiesLayout";
import { useDropzone } from "react-dropzone";
import { IconUpload } from "../../icons/IconUpload";
import { useEffect, useState } from "react";
import PreviewImage from "../PreviewImage/PreviewImage";
import { useGetGallery } from "@/app/dashboard2/gallery/useGallery";

export const DesignProperties = () => {
  const [imgURL, setImgURL] = useState<string>("");
  const [prevIma, setPrevIma] = useState(true);
  const { data } = useGetGallery();
  const updateGroupId = useProductStore((state) => state.updateGroupId);
  const groupId = useProductStore((state) => state.groupId);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      "image/*": [],
    },
    onDrop: async (acceptedFiles) => {
      console.log(acceptedFiles[0]);
      console.log("viendo", URL.createObjectURL(acceptedFiles[0]));
      const response = await fetch(
        "https://media.licdn.com/dms/image/C5603AQFJGyfUdfWEvw/profile-displayphoto-shrink_100_100/0/1617441516348?e=1706745600&v=beta&t=nN2--3rE1K3QFwbMW_x16MpZVybXN52smQOZ1UnWpxE"
      );
      const imageBlob = await response.blob();
      console.log("imageBlob", imageBlob);
      console.log("imageBlob64", URL.createObjectURL(imageBlob));

      updateImgBase64Logo(URL.createObjectURL(imageBlob));
      setImgURL(URL.createObjectURL(imageBlob));
    },
  });
  const updateImgLogo = useProductStore((state) => state.updateImgLogo);
  const updateImgBase64Logo = useProductStore(
    (state) => state.updateImgBase64Logo
  );
  const updateScale = useProductStore((state) => state.updateScale);
  const scale = useProductStore((state) => state.scale);
  const position = useProductStore((state) => {
    return {
      x: state.x,
      y: state.y,
      z: state.z,
    };
  });
  const angle = useProductStore((state) => state.angle);
  const selectModel = useProductStore((state) => state.selectModel);

  useEffect(() => {
    setPrevIma(false);
  }, [imgURL]);

  useEffect(() => {
    if (!prevIma) {
      setPrevIma(true);
    }
  }, [prevIma]);

  return (
    <MenuPropertiesLayout>
      <MenuPropertiesLayoutTitle>Design Properties</MenuPropertiesLayoutTitle>
      <div className="p-2 w-full">
        <div className="grid grid-rows-2 items-center justify-center p-3">
          <div>Position</div>
          <div className="grid grid-cols-2 items-center gap-2">
            <div className="grid grid-cols-[20px_1fr] rounded-lg p-2 bg-gray-100">
              <div>X</div>
              <input
                className="w-full appearance-none bg-gray-100"
                value={position.x}
                type="number"
                step="0.001"
              />
            </div>
            <div className="grid grid-cols-[20px_1fr] rounded-lg p-2 bg-gray-100">
              <div>Y</div>
              <input
                className="w-full appearance-none bg-gray-100"
                step="0.001"
                value={position.y}
                type="number"
              />
            </div>
          </div>
        </div>
        <div className="grid grid-rows-2 items-center justify-center p-3">
          <div>Rotation</div>
          <div className="grid items-center gap-2">
            <div className="grid grid-cols-[20px_1fr] rounded-lg p-2 bg-gray-100 items-center gap-2">
              <div>
                <IconRounded />
              </div>
              <input
                className="w-full appearance-none bg-gray-100 max-w-[96px] h-8"
                value={angle}
                type="number"
              />
            </div>
          </div>
        </div>
        <div className="grid grid-rows-2 items-center justify-center p-2">
          <div>Scale</div>
          <form className="grid grid-cols-[2fr_1fr] gap-2">
            <Slider.Root
              className="SliderRoot"
              defaultValue={[0.1]}
              max={1}
              step={0.05}
              onValueChange={(e) => {
                updateScale(e[0]);
              }}
            >
              <Slider.Track className="SliderTrack">
                <Slider.Range className="SliderRange" />
              </Slider.Track>
              <Slider.Thumb className="SliderThumb" aria-label="Volume" />
            </Slider.Root>
            <input
              className="w-full appearance-none bg-gray-100 rounded-lg"
              value={scale}
              type="number"
            />
          </form>
        </div>
        <div>
          {data && (
            <select
              className="w-full bg-gray-100 h-10 rounded-lg mt-4 cursor-pointer"
              value={groupId ? groupId : ""}
              onChange={async (e) => {
                const idNumber = parseInt(e.target.value);
                const selectImage = data.data.gallery.find((image: any) => {
                  return image.id === idNumber;
                });
                updateGroupId(selectImage.id);
                const response = await fetch(selectImage.urlImage);
                const imageBlob = await response.blob();

                updateImgBase64Logo(URL.createObjectURL(imageBlob));
                setImgURL(URL.createObjectURL(imageBlob));
              }}
            >
              <option value="">*Select Art</option>
              {data.data.gallery.map((art: any) => {
                return (
                  <option key={art.id} value={art.id}>
                    {art.name}
                  </option>
                );
              })}
            </select>
          )}
        </div>
        {prevIma && <PreviewImage imageFile={imgURL} />}
      </div>
    </MenuPropertiesLayout>
  );
};
