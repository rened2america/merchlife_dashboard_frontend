import { FC, ReactNode } from "react";

type TMenuPropertiesLayout = {
  children: ReactNode;
};

export const MenuPropertiesLayout: FC<TMenuPropertiesLayout> = ({
  children,
}) => {
  return (
    <div className="h-full max-h-[600px] w-full bg-white rounded-[24px] p-[16px_8px] grid grid-rows-[32px_1fr]">
    {children}
  </div>
  );
};

export const MenuPropertiesLayoutTitle: FC<TMenuPropertiesLayout> = ({
  children,
}) => {
  return (
    <div className="grid justify-items-center text-lg font-bold">
    {children}
  </div>
  );
};
