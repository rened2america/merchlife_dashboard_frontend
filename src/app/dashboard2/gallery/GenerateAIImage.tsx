import {useEffect, useState} from 'react'
import { useGetGallery, useUploadArt } from './useGallery';
import * as Toast from "@radix-ui/react-toast";
import { ToastContainer, toast } from "react-toastify";
import { IconNotification } from '@/common/components/icons/IconNotification';
import BeatLoader from 'react-spinners/BeatLoader';
import { IconCheckmark } from '@/common/components/icons/IconCheckmark';
import { useProductStore } from '@/store/productStore';

const GenerateAIImage = () => {
    const { mutate, isLoading: isLoadingArt, status } = useUploadArt();
    const { data, isLoading, refetch } = useGetGallery();
    const [textPrompt, setTextPrompt] = useState("");
    const [imageName, setImageName] = useState("");
    const [openToastImage, setOpenToastImage] = useState(false);
    const [openToastImageState, setOpenToastImageState] =
      useState("Creating Image");
    const transitionProduct = useProductStore((state) => state.transitionProduct);

    
    async function fetchImage(e : any) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("prompt", textPrompt);
        formData.append("output_format", "webp");
        setOpenToastImage(true);
        setOpenToastImageState("Creating Image");
        let apiKey = process.env.NEXT_PUBLIC_STABILITY_AI_API_KEY;
        console.log("apiKey: ", apiKey)
        const requestOptions = {
            method: "POST",
            body: formData,
            headers: {
                Authorization:
                    `Bearer ${apiKey}`,
                Accept: "image/*",
            },
        };

        try {
            const response = await fetch(
                "https://api.stability.ai/v2beta/stable-image/generate/core",
                requestOptions
            );

            if (!response.ok) {
                throw new Error(`${response.status}: ${await response.text()}`);
            }

            const imageBuffer = await response.arrayBuffer();
            const buffer = Buffer.from(imageBuffer);
            // Creamos un nuevo FormData para enviar la imagen
            const blob = new Blob([buffer], { type: "image/png" });
            const base64String = buffer.toString("base64");
            const uploadFormData = new FormData();
            uploadFormData.append("art", blob);
            uploadFormData.append(
                "name",
                imageName
            );
            uploadFormData.append("imageCrop", base64String);
            // Llamamos a la función para subir la imagen
            const uploadResponse = await mutate(uploadFormData);
            setOpenToastImageState("Saving Image");
            console.log("Upload response:", uploadResponse);
        } catch (error) {
            console.error("Error fetching image:", error);
        }
    }
    const getTextPrompt = (e: any) => {
        console.log(e);
        setTextPrompt(e.target.value);
    };
    const getImageName = (e: any) => {
        console.log(e);
        setImageName(e.target.value);
    };
    useEffect(() => {
        if (status === "success") {
            setOpenToastImage(false);
            setOpenToastImageState("Creating Image");
        }
    }, [status]);

    return (
         <div className="p-4 bg-gray-800 rounded-lg">
      <form>
        <div className="flex flex-col gap-4">
          <input 
            type="text" 
            className="p-2 w-full text-sm bg-gray-700 text-white rounded border border-gray-600" 
            placeholder="Image name.." 
            required 
            onChange={getImageName} 
          />
          <div className="relative w-full">
            <input
              type="search"
              className="p-2 w-full text-sm bg-gray-700 text-white rounded border border-gray-600"
              placeholder="Prompt..."
              required
              onChange={getTextPrompt}
            />
            <button
              onClick={fetchImage}
              className="absolute top-0 right-0 p-2 text-sm text-white bg-blue-600 rounded border border-blue-600 hover:bg-blue-700"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 19L15 15M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"
                />
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </div>
        </div>
      </form>
      <Toast.Provider swipeDirection="right">
        <Toast.Root
          className="bg-white shadow-md p-4 rounded-md"
          open={openToastImage}
        >
          <Toast.Title className="text-lg font-semibold">
            Creating AI Image
          </Toast.Title>
          <Toast.Description className="text-sm font-medium flex items-center">
            <span>{openToastImageState}</span>
            <BeatLoader color="#36d7b7" loading={true} size={16} />
            <span className={`ml-2 ${transitionProduct === "saved" ? "text-green-500" : "text-yellow-500"}`}>
              {transitionProduct === "saved" ? <IconCheckmark /> : <IconNotification />}
            </span>
          </Toast.Description>
        </Toast.Root>
        <Toast.Viewport className="fixed bottom-10 right-10 flex flex-col gap-4 w-64 max-w-full z-[2147483647]" />
      </Toast.Provider>
    </div>
        // <div
        // >
        //     <form>
        //         <div className="flex">
                   
        //             <div className='flex flex-col gap-7'>

        //             <input 
        //                 type="text" 
        //                 className='block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded rounded-s-gray-100 rounded-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500' 
        //                 placeholder = "Image name.."
        //                 required
        //                 onChange={getImageName}
        //                 />
        //             <div className="relative w-full">
        //                 <input
        //                     type="search"
        //                     id="search-dropdown"
        //                     className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg rounded-s-lg rounded-s-gray-100 rounded-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
        //                     placeholder="Prompt..."
        //                     required
        //                     onChange={getTextPrompt}
        //                     />
        //                 <button
        //                     onClick={fetchImage}
        //                     className="absolute top-0 end-0 p-2.5 h-full text-sm font-medium text-white bg-stone-950 rounded-e-lg border border-stone-950 hover:bg-stone-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        //                     >
        //                     <svg
        //                         className="w-4 h-4"
        //                         aria-hidden="true"
        //                         xmlns="http://www.w3.org/2000/svg"
        //                         fill="none"
        //                         viewBox="0 0 20 20"
        //                         >
        //                         <path
        //                             stroke="currentColor"
        //                             strokeLinecap="round"
        //                             strokeLinejoin="round"
        //                             strokeWidth="2"
        //                             d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
        //                             />
        //                     </svg>
        //                 </button>
        //             </div>
        //                             </div>
        //         </div>
        //     </form>
        //     <Toast.Provider swipeDirection="right">
        //     <Toast.Root
        //       style={{
        //         backgroundColor: "white",
        //         borderRadius: "8px",
        //         padding: "16px 32px",
        //       }}
        //       open={openToastImage}
        //     >
        //       <Toast.Title
        //         style={{
        //           fontSize: "16px",
        //           fontWeight: "500",
        //         }}
        //       >
        //         Creating AI Image
        //       </Toast.Title>
        //       <Toast.Description
        //         style={{
        //           fontSize: "14px",
        //           fontWeight: "700",
        //           display: "grid",
        //           gridTemplateColumns: "1fr 40px",
        //         }}
        //       >
        //         <div>
        //           {openToastImageState}
        //           <BeatLoader color="#36d7b7" loading={true} size={"16px"} />
        //         </div>

        //         <div
        //           style={{
        //             borderRadius: "32px",
        //             border:
        //               transitionProduct === "saved"
        //                 ? "1px solid #3DD68C"
        //                 : "1px solid #FFC53D",
        //             display: "grid",
        //             alignItems: "center",
        //             justifyItems: "center",
        //             width: "32px",
        //             height: "32px",
        //             color:
        //               transitionProduct === "saved" ? "#3DD68C" : "#FFC53D",
        //           }}
        //         >
        //           {openToastImageState === "Saving Image" ? (
        //             <IconCheckmark />
        //           ) : (
        //             <IconNotification />
        //           )}
        //         </div>
        //       </Toast.Description>
        //     </Toast.Root>
        //     <Toast.Viewport
        //       style={{
        //         position: "fixed",
        //         bottom: "40px",
        //         right: "300px",
        //         display: "flex",
        //         flexDirection: "column",
        //         gap: "10px",
        //         width: "250px",
        //         maxWidth: "100vw",
        //         margin: "0",
        //         listStyle: "none",
        //         zIndex: "2147483647",
        //         outline: "none",
        //       }}
        //     />
        //   </Toast.Provider>
        // </div>
    )
}

export default GenerateAIImage;