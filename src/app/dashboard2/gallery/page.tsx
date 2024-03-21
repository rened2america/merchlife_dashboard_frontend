"use client";
import { useState, useEffect } from "react";
import { PageTitle } from "@/common/components/generic/PageTitle/PageTitle";
import { PageLayout } from "@/common/layouts/PageLayout/PageLayout";
import { useGetGallery, useUploadArt } from "./useGallery";
import { useDropzone } from "react-dropzone";
import { IconUpload } from "@/common/components/icons/IconUpload";
import Image from "next/image";
import Cropper from "react-easy-crop";
import getCroppedImg from "./cropImage";
const Gallery = () => {
  const { mutate, isLoading: isLoadingArt } = useUploadArt();
  const { data, isLoading, refetch } = useGetGallery();
  const [imageName, setImageName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [urlImage, setUrlImage] = useState(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [imageCrop, setImageCrop] = useState(null);
  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels);
    setCroppedAreaPixels(croppedAreaPixels);
  };
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
            handleSubmit(base64data);
          };
        });
      setUrlImage(croppedImage);
    } catch (e) {
      console.error(e);
    }
  };

  const { getInputProps, acceptedFiles, getRootProps, fileRejections } =
    useDropzone({
      multiple: false,
      maxSize: 31457280,
      accept: {
        "image/*": [],
      },
      onDrop: (acceptedFiles) => {
        console.log("acceptedFiles", acceptedFiles[0]);
        if (acceptedFiles[0]) {
          setUrlImage(URL.createObjectURL(acceptedFiles[0]));
          setSelectedFile(acceptedFiles[0]);
        } // Guardar la imagen seleccionada
      },
    });

  const handleSubmit = (imageCrop) => {
    if (selectedFile && imageName) {
      const formData = new FormData();
      formData.append("art", selectedFile);
      formData.append("name", imageName);
      formData.append("imageCrop", imageCrop);
      mutate(formData);
    } else {
      // Manejar el caso en que no se haya seleccionado una imagen o no se haya ingresado un nombre
    }
  };

  useEffect(() => {
    if (!isLoadingArt) {
      refetch();
    }
  }, [isLoadingArt]);

  console.log("selectedFile", fileRejections);

  return (
    <PageLayout>
      <PageTitle>Gallery</PageTitle>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 250px",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
            gap: "16px",
            margin: "16px 0",
          }}
        >
          {data &&
            data.data.gallery.map((img: any) => {
              return (
                <div key={img.id}>
                  <div
                    style={{
                      width: "120px",
                      height: "180px",
                      position: "relative",
                      backgroundColor: "rgb(248, 249, 249)",
                      display: "grid",
                      gridTemplateRows: "1fr 100px",
                    }}
                  >
                    <Image
                      key={img.id}
                      src={img.urlImage}
                      layout="fill"
                      objectFit="contain"
                      alt={img.name}
                    />
                  </div>
                  <h2
                    style={{
                      fontSize: "16px",
                      fontWeight: "500",
                    }}
                  >
                    {img.name}
                  </h2>
                </div>
              );
            })}
        </div>
        <div
          style={{
            display: "grid",
            width: "250px",
            gridTemplateRows: "80px 30px 1fr 40px 80px",
            alignItems: "center",
            gap: "16px",
            backgroundColor: "#111",
            padding: "24px 16px",
            borderRadius: "16px",
          }}
        >
          <input
            type="text"
            placeholder="Enter image name"
            value={imageName}
            onChange={(e) => setImageName(e.target.value)}
            style={{
              backgroundColor: "rgb(248, 249, 249)",
              height: "40px",
              borderRadius: "8px",
              padding: "0px 16px",
              width: "100%",
            }}
          />
          <div
            style={{
              color: "white",
            }}
          >
            Aspect Ratio 2/3
          </div>
          <div
            style={{
              position: "relative",
              height: "300px",
            }}
          >
            {urlImage && (
              <Cropper
                image={urlImage}
                crop={crop}
                zoom={zoom}
                aspect={20 / 30}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            )}
          </div>
          <div className="controls">
            <input
              type="range"
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby="Zoom"
              onChange={(e) => {
                setZoom(e.target.value);
              }}
              className="zoom-range"
              style={{
                width: "100%",
              }}
            />
          </div>

          <div
            {...getRootProps({ className: "dropzone" })}
            style={{
              fontSize: "13px",
              fontWeight: "700",
              padding: "8px 8px",
              display: "grid",
              alignItems: "center",
              justifyItems: "center",
              backgroundColor: "#f8f9f9",
              borderRadius: "8px",
              gridTemplateColumns: "1fr 32px",
              cursor: "pointer",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            <input {...getInputProps()} />
            {acceptedFiles.length > 0 ? (
              <div>{acceptedFiles[0].path}</div>
            ) : fileRejections.length > 0 &&
              fileRejections[0].errors[0].code === "file-too-large" ? (
              <div style={{ color: "red", fontWeight: "700" }}>
                File is larger than 30 Mb
              </div>
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
          </div>
          <button
            onClick={showCroppedImage}
            style={{
              display: "grid",
              placeItems: "center",
              fontSize: "14px",
              fontWeight: "700",
              backgroundColor: "black",
              height: "40px",
              borderRadius: "8px",
              color: "white",
            }}
          >
            Upload logo
          </button>
        </div>
      </div>
    </PageLayout>
  );
};

export default Gallery;
