import { FC } from "react";
import { IconEye } from "../../icons/IconEye";
import { useProductStore } from "@/store/productStore";

const DEFAULT_COLORS = {
  white: "white",
  beige: "#F3E5AB",
  red: "#FF0000",
  blue: "#4169e1",
  black: "#313131",
};

export const CardColor: FC<{ color: string; colorName: string }> = ({
  color,
  colorName,
}) => {
  const updateColorsSelected = useProductStore(
    (state) => state.updateColorsSelected
  );
  const colorsSelected = useProductStore((state) => state.colorsSelected);
  const updateColor = useProductStore((state) => state.updateColor);
  return (
    <div
    className="grid grid-cols-[1fr_40px]  items-center  justify-items-center mt-[16px]"
  
    >
      <div
      className={`grid grid-cols-[32px_1fr]  justify-items-center items-center py-[8px] px-[16px] border rounded-xl w-full cursor-pointer  ${colorsSelected[color] ? 'border-black' : 'border-white'}`}
    
        onClick={() => {
          if (color != "white") {
            updateColorsSelected(color);
          }
        }}
      >
        <div
        className={` h-[32px] w-[32px] rounded-full border border-black`}
          style={{
            backgroundColor: DEFAULT_COLORS[color],
          }}
        ></div>
        <div>{colorName}</div>
      </div>
      <div
      className="grid cursor-pointer"
        onClick={() => {
          updateColor(DEFAULT_COLORS[color]);
        }}
      >
        <IconEye />
      </div>
    </div>
  );
};
