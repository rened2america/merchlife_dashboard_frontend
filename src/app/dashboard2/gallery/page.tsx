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
import BeatLoader from "react-spinners/BeatLoader";
import GenerateAIImage from "./GenerateAIImage";
const Gallery = () => {
  const { mutate, isLoading: isLoadingArt } = useUploadArt();
  const { data, isLoading, refetch } = useGetGallery();
  const [imageName, setImageName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [urlImage, setUrlImage] = useState(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [shouldCreatePoster, setShouldCreatePoster] = useState(false);
  const [shouldCreateCanvas, setShouldCreateCanvas] = useState(false);
  const [useAIForImage, setuseAIForImage] = useState(true);
  const [imageCrop, setImageCrop] = useState(null);
  const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    console.log(croppedArea, croppedAreaPixels);
    setCroppedAreaPixels(croppedAreaPixels);
  };
  const showCroppedImage = async () => {
    try {
      const croppedImage: any = await getCroppedImg(
        urlImage,
        croppedAreaPixels
      );
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
      maxFiles: 1,
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

  const handleSubmit = (imageCrop: any) => {
    if (selectedFile && imageName) {
      const formData = new FormData();
      formData.append("art", selectedFile);
      formData.append("name", imageName);
      formData.append("imageCrop", imageCrop);
      formData.append("shouldCreateCanvas", String(shouldCreateCanvas));
      formData.append("shouldCreatePoster", String(shouldCreatePoster));
      mutate(formData);
    } else {
      // Handle the case where an image has not been selected or a name has not been entered
    }
  };
  const handlePosterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShouldCreatePoster(event.target.checked);
  };

  const handleCanvasChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShouldCreateCanvas(event.target.checked);
  };

  const toggleUseAIForImage = () => {
    setuseAIForImage(!useAIForImage);
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
      <button
        className="mb-4 p-2.5 text-sm font-medium text-white bg-gray-900  rounded-lg border bg-gray-900  hover:bg-gray-900  focus:ring-4 focus:outline-none focus:ring-blue-300"
        onClick={toggleUseAIForImage}
      >
        {useAIForImage ? "Upload a custom image" : "Generate an Image using AI"}
      </button>
      <div className="grid md:grid-cols-1 lg:grid-cols-[1fr,300px] gap-12">
        <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-4 my-4">
          {data &&
            data.data.gallery.map((img: any) => {
              return (
                <div key={img.id}>
                  <div className="w-[120px] h-[180px] relative bg-[#F8F9F9] grid grid-rows-[1fr_100px] border rounded-sm">
                    <Image
                      key={img.id}
                      src={img.urlImage}
                      layout="fill"
                      objectFit="contain"
                      alt={img.name}
                    />
                  </div>
                  <h2 className="text-lg font-semibold mt-2"> {img.name}</h2>
                </div>
              );
            })}
        </div>

        <div className="grid gap-4 bg-gray-900 p-6 rounded-lg">
          {useAIForImage ? (
            <GenerateAIImage />
          ) : (
            <>
              <input
                type="text"
                placeholder="Enter image name"
                value={imageName}
                onChange={(e) => setImageName(e.target.value)}
                className="p-2 w-full text-sm bg-gray-800 text-white rounded border border-gray-700"
              />
              <div className="text-white">Aspect Ratio 2/3</div>
              <div className="relative h-64">
                {urlImage && (
                  <Cropper
                    image={urlImage}
                    crop={crop}
                    zoom={zoom}
                    aspect={2 / 3}
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
              <div
                {...getRootProps({ className: "dropzone" })}
                className="flex items-center justify-center p-2 bg-gray-700 rounded border border-gray-600 cursor-pointer"
              >
                <input {...getInputProps()} />
                {acceptedFiles.length > 0 ? (
                  <div>{acceptedFiles[0].path}</div>
                ) : fileRejections.length > 0 &&
                  fileRejections[0].errors[0].code === "file-too-large" ? (
                  <div className="text-red-600 font-bold">
                    File is larger than 30 Mb
                  </div>
                ) : (
                  <div>Upload logo in PNG</div>
                )}
                <div className="ml-2 p-1 border border-gray-500 rounded-full">
                  <IconUpload />
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div>
                  <input
                    type="checkbox"
                    id="shouldCreatePoster"
                    name="shouldCreatePoster"
                    checked={shouldCreatePoster}
                    onChange={handlePosterChange}
                  />
                  <label
                    htmlFor="shouldCreatePoster"
                    className="text-white ml-2"
                  >
                    Create Poster
                  </label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="shouldCreateCanvas"
                    name="shouldCreateCanvas"
                    checked={shouldCreateCanvas}
                    onChange={handleCanvasChange}
                  />
                  <label
                    htmlFor="shouldCreateCanvas"
                    className="text-white ml-2"
                  >
                    Create Canvas
                  </label>
                </div>
              </div>
              <button
                onClick={showCroppedImage}
                className="mt-4 p-2 text-sm font-medium text-white bg-blue-600 rounded border border-blue-600 hover:bg-blue-700"
              >
                {isLoadingArt ? (
                  <BeatLoader loading={isLoadingArt} color="white" size={16} />
                ) : (
                  "Upload logo"
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default Gallery;
