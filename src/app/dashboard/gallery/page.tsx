"use client";
import { useState, useEffect, useCallback } from "react";
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
import BuyCredits from "./BuyCredits";
import SyncLoader from "react-spinners/SyncLoader";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Gallery = () => {
  const { mutate, isLoading: isLoadingArt } = useUploadArt();
  const { data, isLoading: isLoadingGallery, refetch } = useGetGallery();
  const availableCredits = data?.data.credits;
  const [imageName, setImageName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [urlImage, setUrlImage] = useState(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [shouldCreatePoster, setShouldCreatePoster] = useState(false);
  const [shouldCreateCanvas, setShouldCreateCanvas] = useState(false);
  const [useAIForImage, setuseAIForImage] = useState(true);
  const [aiGeneratedImage, setAiGeneratedImage] = useState(null);

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels);
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const showCroppedImage = async () => {
    let errorMessages = [];

    // Validate image title
    if (!imageName) {
      errorMessages.push("Please enter the image Title");
    }

    // Validate file or AI-generated image
    if (!(selectedFile || aiGeneratedImage)) {
      errorMessages.push("Please upload or generate an image");
    }

    // Display errors if any
    if (errorMessages.length) {
      toast.error(errorMessages.join("\n"), {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
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

  const { getInputProps, acceptedFiles, getRootProps, fileRejections } = useDropzone({
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

  const handleSubmit = (imageCrop) => {
    // Validations are already done in showCroppedImage
    const formData = new FormData();
    formData.append("art", imageCrop);
    formData.append("name", imageName);
    formData.append("shouldCreateCanvas", String(shouldCreateCanvas));
    formData.append("shouldCreatePoster", String(shouldCreatePoster));
    mutate(formData);

  };

  const handlePosterChange = (event) => {
    setShouldCreatePoster(event.target.checked);
  };

  const handleCanvasChange = (event) => {
    setShouldCreateCanvas(event.target.checked);
  };

  const toggleUseAIForImage = () => {
    setuseAIForImage(!useAIForImage);
  };

  const handleAIGeneratedImage = (imageName: string, image) => {
    setImageName(imageName)
    setAiGeneratedImage(image);
    setUrlImage(URL.createObjectURL(image));
    refetch()
  };

  useEffect(() => {
    if (!isLoadingArt) {
      refetch();
    }
  }, [isLoadingArt]);

  const handleZoomChange = useCallback((newZoom) => {
    setZoom(newZoom);
  }, []);

  console.log("selectedFile", fileRejections);
  return isLoadingGallery ?
    <div className="flex items-center justify-center h-screen"><SyncLoader /></div>
    :
    (
      <PageLayout>
        <PageTitle>Gallery</PageTitle>

        <div className="grid md:grid-cols-1 lg:grid-cols-[1fr,300px] gap-12">
          <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-4 my-4">
            {data &&
              data.data.gallery.map((img) => {
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
                    <h2 className="text-lg font-semibold mt-2">{img.name}</h2>
                  </div>
                );
              })}
          </div>
          <div>
            <button
              className="w-full mb-4 p-2.5 text-sm font-medium text-white rounded-lg border bg-blue-600 hover:bg-blue-700  focus:ring-4 focus:outline-none focus:ring-blue-300"
              onClick={toggleUseAIForImage}
            >
              {useAIForImage ? "Upload a custom image" : "Generate an Image using AI"}
            </button>
            <div className="grid gap-4 bg-gray-900 p-6 rounded-lg text-white">
              {useAIForImage ? (
                availableCredits > 0 ?
                  <GenerateAIImage onImageGenerated={handleAIGeneratedImage} availableCredits={availableCredits} />
                  :
                  <BuyCredits />
              ) : (
                <div>
                  <h3 className='text-white mb-2 text-center'>Upload Custom Image</h3>
                  <div className="flex flex-col gap-4">

                    <div>
                      <label htmlFor="title" className="text-sm">Title</label>
                      <input
                        type="text"
                        id="title"
                        placeholder="Enter Image Title"
                        value={imageName}
                        onChange={(e) => setImageName(e.target.value)}
                        className="p-2 w-full text-sm bg-gray-800 text-white rounded border border-gray-700"
                      />
                    </div>

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
                  </div>
                </div>
              )}
              {(availableCredits === 0 && useAIForImage) ?
                <></>
                :
                <>
                  <div className="mt-4 space-y-2">
                    <div>
                      <input type="checkbox" id="shouldCreatePoster" name="shouldCreatePoster" checked={shouldCreatePoster} onChange={handlePosterChange} />
                      <label htmlFor="shouldCreatePoster" className="text-white ml-2">Create Poster</label>
                    </div>
                    <div>
                      <input type="checkbox" id="shouldCreateCanvas" name="shouldCreateCanvas" checked={shouldCreateCanvas} onChange={handleCanvasChange} />
                      <label htmlFor="shouldCreateCanvas" className="text-white ml-2">Create Canvas</label>
                    </div>
                  </div>
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
                        minZoom={0.5}
                        maxZoom={2}
                        restrictPosition={false}
                      />
                    )}
                  </div>
                  <input
                    type="range"
                    value={zoom}
                    min={0}
                    max={2}
                    step={0.05}
                    onChange={(e) => handleZoomChange(parseFloat(e.target.value))}
                    className="w-full mt-2"
                  />
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


              }
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
          </div>
        </div>
      </PageLayout>
    );
};

export default Gallery;
