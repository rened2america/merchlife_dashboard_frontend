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
  const isSelected = useProductStore((state) => state.colorsSelected[color]);
  const updateColor = useProductStore((state) => state.updateColor);
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 40px",
        alignItems: "center",
        justifyItems: "center",
        marginTop: "16px",
      }}
    >
      <div
        style={
          isSelected
            ? {
                display: "grid",
                gridTemplateColumns: "32px 1fr",
                alignItems: "center",
                justifyItems: "center",
                padding: "8px 16px",
                border: "1px solid black",
                borderRadius: "16px",
                cursor: "pointer",
                width: "100%",
              }
            : {
                display: "grid",
                gridTemplateColumns: "32px 1fr",
                alignItems: "center",
                justifyItems: "center",
                padding: "8px 16px",
                border: "1px solid white",
                borderRadius: "16px",
                cursor: "pointer",
                width: "100%",
              }
        }
        onClick={() => {
          if (color != "white") {
            updateColorsSelected(color);
          }
        }}
      >
        <div
          style={{
            backgroundColor: DEFAULT_COLORS[color],
            height: "32px",
            width: "32px",
            borderRadius: "40px",
            border: "1px solid black",
          }}
        ></div>
        <div>{colorName}</div>
      </div>
      <div
        style={{
          display: "grid",
          cursor: "pointer",
        }}
        onClick={() => {
          updateColor(DEFAULT_COLORS[color]);
        }}
      >
        <IconEye />
      </div>
    </div>
  );
};
