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
import { useEffect, useState } from "react";
import PreviewImage from "../PreviewImage/PreviewImage";
import { useGetGallery } from "@/app/dashboard/gallery/useGallery";
// import PreviewImage from "../PreviewImage/PreviewImage";

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
      // console.log(acceptedFiles[0]);
      // console.log("viendo", URL.createObjectURL(acceptedFiles[0]));
      const response = await fetch(
        "https://media.licdn.com/dms/image/C5603AQFJGyfUdfWEvw/profile-displayphoto-shrink_100_100/0/1617441516348?e=1706745600&v=beta&t=nN2--3rE1K3QFwbMW_x16MpZVybXN52smQOZ1UnWpxE"
      );
      // Paso 2: Convertir a Blob
      const imageBlob = await response.blob();
      // console.log("imageBlob", imageBlob);
      // console.log("imageBlob64", URL.createObjectURL(imageBlob));

      // updateImgLogo(URL.createObjectURL(acceptedFiles[0]));
      updateImgBase64Logo(URL.createObjectURL(imageBlob));
      setImgURL(URL.createObjectURL(imageBlob));
    },
  });
  const updateImgBase64Logo = useProductStore(
    (state) => state.updateImgBase64Logo
  );
  const updateScale = useProductStore((state) => state.updateScale);
  const updatePosition = useProductStore((state) => state.updatePosition);
  const updateAngle = useProductStore((state) => state.updateAngle);
  const scale = useProductStore((state) => state.scale);
  const position = useProductStore((state) => {
    return {
      x: state.x,
      y: state.y,
      z: state.z,
    };
  });
  const angle = useProductStore((state) => state.angle);  

  useEffect(() => {
    setPrevIma(false);
  }, [imgURL]);

  useEffect(() => {
    if (!prevIma) {
      setPrevIma(true);
    }
  }, [prevIma]);

  // Define the allowed area boundaries
  // Default set for Sweatshirt
  let AREA_X_MIN: number = -0.14;
  let AREA_X_MAX: number = 0.14;
  let AREA_Y_MIN: number = -0.3;
  let AREA_Y_MAX: number = 0.12;
  const selectedModel = useProductStore.getState().selectModel;
  const MIN_SCALE = selectedModel === "Mug" ? 0.03 : 0.1
  let maxScale = 0.3;
  
  if(selectedModel == "Shirt"){    
    AREA_X_MIN = -0.14;
    AREA_X_MAX = 0.14;
    AREA_Y_MIN = -0.29;
    AREA_Y_MAX = 0.14;
  }
  else if(selectedModel == "Hoodie"){    
    AREA_X_MIN = -10;
    AREA_X_MAX = 0.5;
    AREA_Y_MIN = -1;
    AREA_Y_MAX = 1.5;
  }
  else if(selectedModel == "Mug"){    
    AREA_X_MIN = -0.05;
    AREA_X_MAX = 0.05;
    AREA_Y_MIN = -0.09;
    AREA_Y_MAX =0.045;
  }  

  // Function to calculate maximum allowed scale
  const calculateMaxScale = (x, y) => {
    const maxScaleX = Math.min(
      (AREA_X_MAX - x) * 2,
      (x - AREA_X_MIN) * 2
    );

    const maxScaleY = Math.min(
      (AREA_Y_MAX - y) * 2,
      (y - AREA_Y_MIN) * 2
    );

    return Math.min(maxScaleX, maxScaleY);
  };

  // Function to adjust position based on scale
  const adjustPositionForScale = (x, y, scale) => {
    const halfScale = scale / 2;

    let adjustedX = x;
    let adjustedY = y;

    if (x + halfScale > AREA_X_MAX) {
      adjustedX = AREA_X_MAX - halfScale;
    } else if (x - halfScale < AREA_X_MIN) {
      adjustedX = AREA_X_MIN + halfScale;
    }

    if (y + halfScale > AREA_Y_MAX) {
      adjustedY = AREA_Y_MAX - halfScale;
    } else if (y - halfScale < AREA_Y_MIN) {
      adjustedY = AREA_Y_MIN + halfScale;
    }

    return { x: adjustedX, y: adjustedY };
  };

  // Handler for scale changes
  const handleScaleChange = (newScale) => {    

    if (isNaN(newScale) || newScale <= 0) {
      // Handle invalid input      
      return;
    }
    if(selectedModel == "Hoodie"){
      updateScale(newScale);
      return;
    }

    const x = useProductStore.getState().x;
    const y = useProductStore.getState().y;
    maxScale = calculateMaxScale(x, y);

    const validatedScale = Math.min(newScale, maxScale);
    
    const finalScale = Math.max(validatedScale, MIN_SCALE);

    const adjustedPosition = adjustPositionForScale(x, y, finalScale);
    updatePosition({ ...adjustedPosition, z: position.z });

    updateScale(finalScale);
  };

  return (
    <MenuPropertiesLayout>
      <MenuPropertiesLayoutTitle>Design Properties</MenuPropertiesLayoutTitle>
      <div
        style={{
          padding: "0 8px",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateRows: "24px 48px",
            justifyItems: "center",
            alignItems: "center",
            padding: "12px 8px",
          }}
        >
          <div>Position</div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "20px 1fr",
                borderRadius: "8px",
                padding: "0 8px",
                backgroundColor: "#f8f9f9",
              }}
            >
              <div>X</div>
              <input
                style={{
                  width: "100%",
                  appearance: "none",
                  backgroundColor: "#f8f9f9",
                }}
                value={position.x}
                type="number"
                step="0.5"
                onChange={(e) => {
                  const updatedX = parseFloat(e.target.value);
                  updatePosition({ ...position, x: updatedX });
                }}
              />
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "20px 1fr",
                borderRadius: "8px",
                padding: "0 8px",
                backgroundColor: "#f8f9f9",
              }}
            >
              <div>Y</div>
              <input
                style={{
                  width: "100%",
                  appearance: "none",
                  backgroundColor: "#f8f9f9",
                }}
                step="0.5"
                value={position.y}
                type="number"
                onChange={(e) => {
                  const updatedY = parseFloat(e.target.value);
                  updatePosition({ ...position, y: updatedY });
                }}
              />
            </div>
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateRows: "24px 48px",
            justifyItems: "center",
            alignItems: "center",
            padding: "12px 24px",
          }}
        >
          <div>Rotation</div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "20px 1fr",
                borderRadius: "8px",
                padding: "0 8px",
                backgroundColor: "#f8f9f9",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <div>
                <IconRounded />
              </div>
              <input
                style={{
                  width: "100%",
                  appearance: "none",
                  backgroundColor: "#f8f9f9",
                  maxWidth: "96px",
                  height: "32px",
                }}
                value={angle}
                type="number"
                step="0.1"
                onChange={(e) => updateAngle(parseFloat(e.target.value))}
              />
            </div>
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateRows: "32px 32px",
            justifyItems: "center",
            alignItems: "center",
            padding: "0 8px",
          }}
        >
          <div>Scale</div>
          <form
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr",
              gap: "8px",
            }}
          >
            <Slider.Root
              className="SliderRoot"
              defaultValue={[MIN_SCALE]}
              max={maxScale}
              min={MIN_SCALE}
              step={0.01}
              onValueChange={(e) => {
                handleScaleChange(e[0]);
              }}
            >
              <Slider.Track className="SliderTrack">
                <Slider.Range className="SliderRange" />
              </Slider.Track>
              <Slider.Thumb className="SliderThumb" aria-label="Volume" />
            </Slider.Root>
            <input
              style={{
                width: "100%",
                appearance: "none",
                backgroundColor: "#f8f9f9",
                borderRadius: "8px",
              }}
              value={scale}
              type="number"
              onChange={(e) => handleScaleChange(parseFloat(e.target.value))}
            />
          </form>
        </div>
        <div>
          {data && (
            <select
              style={{
                width: "100%",
                backgroundColor: "rgb(248, 249, 249)",
                height: "40px",
                borderRadius: "8px",
                marginTop: "16px",
                cursor: "pointer",
              }}
              value={groupId ? groupId : ""}
              onChange={async (e) => {
                const idNumber = parseInt(e.target.value);
                // Need these when someone clicks on select art
                if(!idNumber){
                  return
                }
                
                const selectImage = data.data.gallery.find((image: any) => {
                  return image.id === idNumber;
                });
                updateGroupId(selectImage.id);
                try {
                  const response = await fetch(selectImage.urlImage);
                  console.log("Error: ", response)
                  const imageBlob = await response.blob();
                  updateImgBase64Logo(URL.createObjectURL(imageBlob));
                  setImgURL(URL.createObjectURL(imageBlob));
                } catch (error) {
                  console.log("Error occured: ", error)
                }
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
        {/* <div
          style={{
            fontSize: "13px",
            fontWeight: "700",
            padding: "8px 8px",
            display: "grid",
            alignItems: "center",
            justifyItems: "center",
            marginTop: "16px",
            backgroundColor: "#f8f9f9",
            borderRadius: "8px",
            gridTemplateColumns: "1fr 32px",
            cursor: "pointer",
          }}
          {...getRootProps({ className: "dropzone" })}
        >
          <input {...getInputProps()} />
          {acceptedFiles.length > 0 ? (
            <div>{acceptedFiles[0].path}</div>
          ) : (
            <div>Upload logo in PNG</div>
          )}
          <div
            style={{
              border: "1px solid #687373",
              borderRadius: "32px",
              padding: "4px",
              color: "#687373",
            }}
          >
            <IconUpload />
          </div>
        </div> */}
        {prevIma && <PreviewImage imageFile={imgURL} />}
      </div>
    </MenuPropertiesLayout>
  );
};
