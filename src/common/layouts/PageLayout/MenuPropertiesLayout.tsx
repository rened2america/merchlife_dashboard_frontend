import { FC, ReactNode } from "react";

type TMenuPropertiesLayout = {
  children: ReactNode;
};

export const MenuPropertiesLayout: FC<TMenuPropertiesLayout> = ({
  children,
}) => {
  return (
    <div
      style={{
        height: "100%",
        maxHeight: "600px",
        width: "240px",
        backgroundColor: "white",
        borderRadius: "24px",
        padding: "16px 8px",
        display: "grid",
        gridTemplateRows: "32px 1fr",
      }}
    >
      {children}
    </div>
  );
};

export const MenuPropertiesLayoutTitle: FC<TMenuPropertiesLayout> = ({
  children,
}) => {
  return (
    <div
      style={{
        display: "grid",
        justifyItems: "center",
        fontSize: "16px",
        fontWeight: "700",
      }}
    >
      {children}
    </div>
  );
};
