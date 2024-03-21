"use client";
import { NavLink } from "@/common/components/primitives/NavLink/NavLink";
import "./Layout.css";
import { IconHome } from "@/common/components/icons/IconHome";
import { IconLayout } from "@/common/components/icons/iconLayout";
import { Avatar } from "@/common/components/primitives/Avatar/Avatar";
import { FC, ReactNode } from "react";
import { IconOrders } from "@/common/components/icons/IconOrder";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useGetProfile } from "./settings/profile/useProfile";
import SyncLoader from "react-spinners/SyncLoader";
import { LuGalleryThumbnails } from "react-icons/lu";

type NewLayout = {
  children: ReactNode;
};

const NewLayout: FC<NewLayout> = ({ children }) => {
  const pathname = usePathname();
  const { data, isLoading } = useGetProfile();
  if (isLoading) {
    return (
      <div
        style={{
          display: "grid",
          placeItems: "center",
          height: "100vh",
          width: "100%",
        }}
      >
        <SyncLoader loading={isLoading} />
      </div>
    );
  }
  return (
    <div
      style={{
        maxHeight: "100%",
        height: "100%",
        display: "grid",
        gridTemplateColumns: "224px 1fr",
      }}
    >
      <nav
        style={{
          display: "grid",
          gridTemplateRows: "96px 1fr",
        }}
      >
        <header
          style={{
            display: "grid",
            alignItems: "center",
            justifyItems: "center",
            padding: "32px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "40px 1fr",
              alignItems: "center",
            }}
          >
            <img height="32px" width="28px" src="/LogoBlack.png" alt="logo" />
            <div
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                fontSize: "0.94rem",
                letterSpacing: "0",
                lineHeight: "1.3rem",
                fontWeight: "700",
                color: "#15171a",
                width: "120px",
              }}
            >
              {data?.data.getArtist.name}
            </div>
          </div>
        </header>
        <section
          style={{
            display: "grid",
            gridTemplateRows: "1fr 96px",
          }}
        >
          <div
            style={{
              color: "black",
            }}
          >
            <div
              style={{
                display: "grid",
                alignItems: "center",
                justifyItems: "start",
              }}
            >
              <NavLink path={pathname} href="/dashboard2">
                <IconHome />
                Home
              </NavLink>
            </div>
            <div
              style={{
                display: "grid",
                alignItems: "center",
                justifyItems: "start",
              }}
            >
              <NavLink path={pathname} href="/dashboard2/products">
                <IconLayout />
                Products
              </NavLink>
            </div>

            <div
              style={{
                display: "grid",
                alignItems: "center",
                justifyItems: "start",
              }}
            >
              <NavLink path={pathname} href="/dashboard2/orders">
                <IconOrders />
                Orders
              </NavLink>
            </div>

            <div
              style={{
                display: "grid",
                alignItems: "center",
                justifyItems: "start",
              }}
            >
              <NavLink path={pathname} href="/dashboard2/gallery">
                <LuGalleryThumbnails style={{ fontSize: "20px" }} />
                Gallery
              </NavLink>
            </div>

            <div
              style={{
                display: "grid",
                alignItems: "center",
                justifyItems: "center",
                height: "100px",
              }}
            >
              <div
                style={{
                  display: "grid",
                  alignItems: "center",
                  justifyItems: "center",
                  fontSize: "14px",
                  fontWeight: "700",
                  backgroundColor: "black",
                  width: "80%",
                  height: "40px",
                  borderRadius: "8px",
                  color: "white",
                }}
              >
                <Link
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "grid",
                    alignItems: "center",
                    justifyItems: "center",
                  }}
                  href="/dashboard2/product/new"
                >
                  Create product
                </Link>
              </div>
            </div>
          </div>
          <footer
            style={{
              display: "grid",
              alignItems: "center",
              justifyItems: "center",
            }}
          >
            <Avatar />
          </footer>
        </section>
      </nav>
      <main
        style={{
          borderLeft: "1px solid #e6e9eb",
          overflowY: "auto",
        }}
      >
        {children}
      </main>
    </div>
  );
};

export default NewLayout;
