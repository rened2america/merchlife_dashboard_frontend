"use client";
import CanvasModel from "@/app/components/Model/Model";
import { Model } from "@/common/components/generic/3DModel/3DModel";
import { DesignProperties } from "@/common/components/generic/DesignProperties/DesignProperties";
import { SelectColor } from "@/common/components/generic/SelectColor/SelectColor";
import { SelectProduct } from "@/common/components/generic/SelectProduct/SelectProduct";
import { Icon3DProduct } from "@/common/components/icons/Icon3DProduct";
import { IconCheckmark } from "@/common/components/icons/IconCheckmark";
import { IconColor } from "@/common/components/icons/IconColor";
import { IconDesign } from "@/common/components/icons/IconDesign";
import { IconNotification } from "@/common/components/icons/IconNotification";
import { useProductStore } from "@/store/productStore";
import * as Toast from "@radix-ui/react-toast";
import { ToastContainer, toast } from "react-toastify";
import BeatLoader from "react-spinners/BeatLoader";

import "react-toastify/dist/ReactToastify.css";

const NewProdut = () => {
  const menu = useProductStore((state) => state.menuDesign);
  const updateMenuDesign = useProductStore((state) => state.updateMenuDesign);
  const updateSave = useProductStore((state) => state.updateSave);
  const openToast = useProductStore((state) => state.openToast);
  const transitionProduct = useProductStore((state) => state.transitionProduct);
  const imgLogo = useProductStore((state) => state.imgLogo);
  const name = useProductStore((state) => state.name);
  const tags = useProductStore((state) => state.tags);
  const verifySubmit = () => {
    let isError = false;
    let errorText = "Error: Missing required parameters";
    if (name.length < 4) {
      isError = true;
      errorText = errorText + ", Name";
    }

    if (tags.length > 3) {
      isError = true;
      errorText = errorText + ", Max 3 tags";
    }

    if (imgLogo === "/LogoBlack.png") {
      isError = true;
      errorText = errorText + ", Logo";
    }

    if (isError) {
      toast.error(errorText, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      updateSave(true);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <section className="grid grid-cols-1 lg:grid-cols-[300px_1fr_200px] gap-6 h-full">
      <div className="bg-white py-4 px-2 rounded-lg shadow-md">
          <Toast.Provider swipeDirection="right">
            <Toast.Root
              className="bg-white p-4 rounded-lg shadow-lg"
              open={openToast}
            >
              <Toast.Title className="text-lg font-medium">
                Creating product
              </Toast.Title>
              <Toast.Description className="text-sm font-bold flex items-center justify-between">
                <div>
                  {transitionProduct}
                  <BeatLoader color="#36d7b7" loading={true} size={"16px"} />
                </div>
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full border ${
                    transitionProduct === "saved"
                      ? "border-green-500 text-green-500"
                      : "border-yellow-500 text-yellow-500"
                  }`}
                >
                  {transitionProduct === "saved" ? (
                    <IconCheckmark />
                  ) : (
                    <IconNotification />
                  )}
                </div>
              </Toast.Description>
            </Toast.Root>
            <Toast.Viewport
              className="fixed bottom-10 right-24 flex flex-col gap-2 w-64 max-w-full z-50 outline-none"
            />
          </Toast.Provider>
          {menu === "Product" ? (
            <SelectProduct />
          ) : menu === "Colors" ? (
            <SelectColor />
          ) : (
            <DesignProperties />
          )}
        </div>
        <div className="flex justify-center items-center bg-white p-4 rounded-lg shadow-md responsive-container">
  <Model />
</div>
      

        <div className="flex flex-col justify-between h-full">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <nav className="space-y-4">
              <div
                className={`flex items-center cursor-pointer p-2 rounded ${
                  menu === "Product" ? "bg-gray-200 font-bold" : ""
                }`}
                onClick={() => updateMenuDesign("Product")}
              >
                <Icon3DProduct />
                <span className="ml-2">Product</span>
              </div>
              <div
                className={`flex items-center cursor-pointer p-2 rounded ${
                  menu === "Design" ? "bg-gray-200 font-bold" : ""
                }`}
                onClick={() => updateMenuDesign("Design")}
              >
                <IconDesign />
                <span className="ml-2">Design</span>
              </div>
              <div
                className={`flex items-center cursor-pointer p-2 rounded ${
                  menu === "Colors" ? "bg-gray-200 font-bold" : ""
                }`}
                onClick={() => updateMenuDesign("Colors")}
              >
                <IconColor />
                <span className="ml-2">Colors</span>
              </div>
            </nav>
          </div>
          <button
            className="mt-6 bg-black text-white p-3 rounded-lg font-bold hover:bg-gray-800 transition"
            onClick={verifySubmit}
          >
            Save and publish
          </button>
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
      </section>
    </div>
  );
};

export default NewProdut;
