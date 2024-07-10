import { FC, ReactNode } from "react";

type TPageTitle = {
  children: ReactNode;
};

export const PageTitle: FC<TPageTitle> = ({ children }) => {
  return (
    <header
     className="text-[#15171a] font-bold text-[32px] py-[24px] px-0 h-[96px]"
    >
      {children}
    </header>
  );
};
