import {
  MenuPropertiesLayout,
  MenuPropertiesLayoutTitle,
} from "@/common/layouts/PageLayout/MenuPropertiesLayout";
import { IconEye } from "../../icons/IconEye";
import { useProductStore } from "@/store/productStore";
import { CardColor } from "./cardColor";

export const SelectColor = () => {
  const updateColorsSelected = useProductStore(
    (state) => state.updateColorsSelected
  );
  const colorsSelected = useProductStore((state) => state.colorsSelected);
  return (
    <MenuPropertiesLayout>
      <MenuPropertiesLayoutTitle>Select Colors</MenuPropertiesLayoutTitle>
      <div
        style={{
          padding: "0 8px",
        }}
      >
        <CardColor color="white" colorName="White" />
        <CardColor color="beige" colorName="Beige" />
        <CardColor color="red" colorName="Red" />
        <CardColor color="blue" colorName="Royal blue" />
        <CardColor color="black" colorName="Black" />
      </div>
      {colorsSelected.white &&
      colorsSelected.beige &&
      colorsSelected.red &&
      colorsSelected.blue &&
      colorsSelected.black ? (
        <div
          style={{
            fontSize: "13px",
            fontWeight: "700",
            textAlign: "center",
          }}
        >
          All colors selected
        </div>
      ) : null}
    </MenuPropertiesLayout>
  );
};
