import Link from "next/link";
import { FC, ReactNode } from "react";
import style from "./NavLink.module.css";
type TNavLink = {
  href: string;
  children: ReactNode;
  path: string;
};

export const NavLink: FC<TNavLink> = ({ href, children, path }) => {
  return (
    <Link
      className={
        path === href ? style["nv-nav-button"] : style["nv-nav-button-active"]
      }
      href={href}
    >
      {children}
    </Link>
  );
};
