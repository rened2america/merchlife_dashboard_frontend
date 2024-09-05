"use client";
import { NavLink } from "@/common/components/primitives/NavLink/NavLink";
import "./Layout.css";
import { IconHome } from "@/common/components/icons/IconHome";
import { IconLayout } from "@/common/components/icons/iconLayout";
import { Avatar } from "@/common/components/primitives/Avatar/Avatar";
import { FC, ReactNode, useState, useEffect } from "react";
import { IconOrders } from "@/common/components/icons/IconOrder";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useGetProfile } from "./settings/profile/useProfile";
import SyncLoader from "react-spinners/SyncLoader";
import { LuGalleryThumbnails } from "react-icons/lu";
import Image from "next/image";

type NewLayout = {
  children: ReactNode;
};

const NewLayout: FC<NewLayout> = ({ children }) => {
  const pathname = usePathname();
  const { data, isLoading: profileLoading } = useGetProfile();
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  useEffect(() => {
    const handleRouteChangeStart = () => setLoading(true);
    const handleRouteChangeEnd = () => setLoading(false);

    // Initially set loading to false when the component mounts
    handleRouteChangeEnd();

    const handleRouteChange = () => {
      console.log("handleRouteChange")
      handleRouteChangeStart();
      setTimeout(handleRouteChangeEnd, 1000);
    };

    // Listen for changes in the pathname
    handleRouteChange();

    return () => {
      handleRouteChangeEnd();
    };
  }, [pathname]);

  if (profileLoading || loading) {
    return (
      <div
        style={{
          display: "grid",
          placeItems: "center",
          height: "100vh",
          width: "100%",
        }}
      >
        <SyncLoader loading={profileLoading || loading} />
      </div>
    );
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <>
    <div className="md:hidden fixed mt-2 right-4 z-10">
        <button
          className="p-2 bg-gray-100 rounded-sm "
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          )}
        </button>
      </div>
    <div
     className={`
      h-full 
      ${isSidebarOpen ? 'md:grid sm:grid' : 'md:grid'} 
      grid-cols-[224px_1fr] lg:grid xl:grid
    `}
    >
      <nav
      className={`${isSidebarOpen ? 'grid' : 'hidden'} md:grid xl:grid lg:grid grid-rows-[96px_1fr]  `}
      >
        <header
        className="grid items-center justify-center p-8"
        >
          <div
          className="grid grid-cols-[40px_1fr] items-center"
          >
            <Image height={32} width={28} src='/logo.png' alt="logo"/>
            <div
            className="overflow-hidden text-ellipsis whitespace-nowrap text-[0.94rem] tracking-normal leading-5 font-bold text-   w-[120px]" 
            >
              {data?.data.getArtist.name}
            </div>
          </div>
        </header>
        <section
        className="grid grid-rows-[1fr 96px]"
        >
          <div
          className="h-full text-black"
          >
            <div
            className="grid items-center"
            >
              <NavLink path={pathname} href="/dashboard">
                <IconHome />
                Home
              </NavLink>
            </div>
            <div
            className="grid items-center justify-items-start"
            >
              <NavLink path={pathname} href="/dashboard/products">
                <IconLayout />
                Products
              </NavLink>
            </div>

            <div
            className="grid items-center justify-items-start"
            >
              <NavLink path={pathname} href="/dashboard/orders">
                <IconOrders />
                Orders
              </NavLink>
            </div>

            <div
            className="gird items-center justify-items-start"
            >
              <NavLink path={pathname} href="/dashboard/gallery">
                <LuGalleryThumbnails style={{ fontSize: "20px" }} />
                Gallery
              </NavLink>
            </div>

            <div
            className="grid items-center justify-items-center h-24"
            >
              <div
              className="gird items-center justify-items-center font-bold text-sm bg-black w-4/5 h-10 rounded-lg text-white"
              >
                <Link
                className="grid w-full h-full items-center justify-items-center"
                  href="/dashboard/product/new"
                >
                  Create product
                </Link>
              </div>
            </div>
          </div>
          <footer
          className="grid items-end mb-10 justify-items-center"
          >
            <Avatar />
          </footer>
        </section>
      </nav>
      <main
      className="border border-l border-s-[#e6e9eb] overflow-y-auto "
      >
        {children}
      </main>
      
    </div>
    </>
  );
};

export default NewLayout;


