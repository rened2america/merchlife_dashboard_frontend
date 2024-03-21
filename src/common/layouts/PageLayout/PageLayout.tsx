import { FC, ReactNode } from "react";

type TPageLayout = {
  children: ReactNode;
};

export const PageLayout: FC<TPageLayout> = ({ children }) => {
  return (
    <section
      style={{
        padding: "0 48px 48px",
      }}
    >
      {children}
    </section>
  );
};
