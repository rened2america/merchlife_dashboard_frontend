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
      <div className="py-0 px-[8px]"
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
        className="text-[13px] text-center"
        >
          All colors selected
        </div>
      ) : null}
    </MenuPropertiesLayout>
  );
};
