import { FC, ReactNode } from "react";

type TPageTitle = {
  children: ReactNode;
};

export const PageTitle: FC<TPageTitle> = ({ children }) => {
  return (
    <header
      style={{
        color: "#15171a",
        fontSize: "32px",
        fontWeight: "700",
        padding: "24px 0px",
        height: "96px",
      }}
    >
      {children}
    </header>
  );
};
