import { create } from "zustand";

const initialState = {
  imgLogo: "/LogoBlack.png",
  imgBase64Logo: "",
  groupId: null,
  imgProduct: {
    white: "",
    beige: "",
    red: "",
    blue: "",
    black: "",
  },
  colorsSelected: {
    white: true,
    beige: true,
    red: true,
    blue: true,
    black: true,
  },
  name: "",
  subtitle: "",
  price: 0,
  description: "",
  product: "",
  color: "#f0f8ff",
  x: 0,
  y: 0,
  z: 0.1,
  angle: 0,
  height: 0,
  width: 0,
  scale: 0.1,
  save: false,
  menuDesign: "Product",
  openToast: false,
  transitionProduct: "creation",
  resetProductColor: false,
  selectModel: "Sweatshirt",
  tags: [],
};

type TimgProduct = {
  white: string;
  beige: string;
  red: string;
  blue: string;
  black: string;
};

type TcolorsSelected = {
  white: boolean;
  beige: boolean;
  red: boolean;
  blue: boolean;
  black: boolean;
};

interface ProductState {
  imgLogo: string;
  imgBase64Logo: string;
  groupId: number;
  imgProduct: TimgProduct;
  colorsSelected: TcolorsSelected;
  name: string;
  subtitle: string;
  price: number;
  description: string;
  product: string;
  color: string;
  x: number;
  y: number;
  z: number;
  angle: number;
  height: number;
  width: number;
  scale: number;
  save: boolean;
  menuDesign: string;
  openToast: boolean;
  transitionProduct: string;
  resetProductColor: boolean;
  selectModel: string;
  tags: string[];
  addNewImgProduct: (imgProduct: Partial<TimgProduct>) => void;
  updatePosition: (position: { x: number; y: number; z: number }) => void;
  updateDimensions: (dimensions: { height: number; width: number; scale: number }) => void;
  updateGroupId: (groupId: number) => void;
  updateColor: (color: string) => void;
  updateSelectModel: (selectModel: string) => void;
  updateTags: (tags: string) => void;
  updateResetProductColor: (resetProductColor: boolean) => void;
  updateColorsSelected: (colorsSelected: string) => void;
  updateName: (name: string) => void;
  setPrice: (price: number) => void;
  validateAndUpdatePrice: (price: number) => void;
  updateSubtitle: (subtitle: string) => void;
  updateDescription: (description: string) => void;
  updateProduct: (product: string) => void;
  updateImgLogo: (imgLogo: string) => void;
  updateSave: (save: boolean) => void;
  updateAngle: (angle: number) => void;
  updateScale: (scale: number) => void;
  updateMenuDesign: (menuDesign: string) => void;
  updateOpenToast: (openToast: boolean) => void;
  updateTransitionProduct: (transitionProduct: string) => void;
  updateImgBase64Logo: (imgBase64Logo: string) => Promise<void>;
  reset: () => void;
}

export const minimumPrices: Record<string, number> = {
  Sweatshirt: 25.99,
  Shirt: 15.99,
  Hoodie: 36.99,
  Mug: 24.99,
};

export const useProductStore = create<ProductState>((set, get) => {
  return {
    ...initialState,
    addNewImgProduct: (imgProduct: TimgProduct) => {
      set((state: any) => {
        return {
          imgProduct: { ...state.imgProduct, ...imgProduct },
        };
      });
    },
    updatePosition: (position: any) => {
      set(() => {
        return {
          x: position.x,
          y: position.y,
          z: position.z,
        };
      });
    },
    updateDimensions: (dimensions: any) => {
      set(() => {
        return {
          height: dimensions.height,
          width: dimensions.width,
          scale: dimensions.scale,
        };
      });
    },
    updateGroupId: (groupId: number) => set({ groupId }),
    updateColor: (color: string) => set({ color }),
    updateSelectModel: (selectModel: string) => {
      const minPrice = minimumPrices[selectModel] || 15.99;
      set({ selectModel, price: minPrice });
    },
    updateTags: (tags: string) => set({ tags }),

    updateResetProductColor: (resetProductColor: boolean) =>
      set({ resetProductColor }),
    updateColorsSelected: (colorsSelected: string) =>
      set((state: any) => {
        return {
          colorsSelected: {
            ...state.colorsSelected,
            ...{ [colorsSelected]: !state.colorsSelected[colorsSelected] },
          },
        };
      }),
    updateName: (name: string) => set({ name }),
    setPrice: (price: number) => set({ price }),
    validateAndUpdatePrice: (price: number) => {
      const { selectModel } = get();
      const minPrice = minimumPrices[selectModel] || 15.99;
      const validatedPrice = parseFloat(price.toString()) < minPrice ? minPrice : parseFloat(price.toString());
      set({ price: validatedPrice });
    },
    updateSubtitle: (subtitle: string) => set({ subtitle }),
    updateDescription: (description: string) => set({ description }),
    updateProduct: (product: string) => set({ product }),
    updateImgLogo: (imgLogo: string) => set({ imgLogo }),
    updateSave: (save: boolean) => set({ save }),
    updateAngle: (angle: number) => set({ angle }),
    updateScale: (scale: number) => set({ scale }),
    updateMenuDesign: (menuDesign: string) => set({ menuDesign }),
    updateOpenToast: (openToast: boolean) => set({ openToast }),
    updateTransitionProduct: (transitionProduct: string) =>
      set({ transitionProduct }),
    updateImgBase64Logo: async (imgBase64Logo: string) => {
      function blobUrlToBase64(blobUrl: any) {
        return new Promise((resolve, reject) => {
          // Realiza una solicitud para obtener el Blob
          fetch(blobUrl)
            .then((response) => response.blob())
            .then((blob) => {
              // Convierte el Blob en un ArrayBuffer
              console.log(blob);
              var reader = new FileReader();
              reader.readAsArrayBuffer(blob);
              reader.onload = function () {
                // Convierte el ArrayBuffer en una cadena base64
                var base64data = arrayBufferToBase64(reader.result);
                console.log("imgLogo", base64data);
                resolve(base64data);
              };
              reader.onerror = function () {
                reject(new Error("Error al leer el Blob como ArrayBuffer"));
              };
            })
            .catch((error) => {
              reject(error);
            });
        });
      }

      // Función para convertir un ArrayBuffer en una cadena base64
      function arrayBufferToBase64(buffer: any) {
        var binary = "";
        var bytes = new Uint8Array(buffer);
        for (var i = 0; i < bytes.byteLength; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        return btoa(binary);
      }
      const imgLogo = await blobUrlToBase64(imgBase64Logo);
      set({
        imgBase64Logo: imgLogo,
      });
    },
    reset: () => {
      set(initialState);
    },
  };
});
