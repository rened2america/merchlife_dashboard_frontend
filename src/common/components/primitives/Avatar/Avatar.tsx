"use client";
import * as AvatarRadix from "@radix-ui/react-avatar";
import { IconArrowDown } from "../../icons/IconArrowDown";
import styles from "./Avatar.module.css";
import Link from "next/link";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import "./nstyle.css";
import { useGetSignout } from "@/service/queryHooks/useSignout";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGetProfile } from "@/app/dashboard2/settings/profile/useProfile";
export const Avatar = () => {
  const { isSuccess, refetch } = useGetSignout();
  const { data, isLoading } = useGetProfile();
  const router = useRouter();
  console.log(data?.data.name);
  useEffect(() => {
    if (isSuccess) {
      window.location.replace(
        `${process.env.NEXT_PUBLIC_BASE_URL_DASHBOARD}login`
      );
    }
  }, [isSuccess]);

  const getInitialFromName = (LocalIsLoading: boolean, userName: string) => {
    if (LocalIsLoading) {
      return "";
    }

    if (!userName) {
      return "";
    }

    const firtsInitial = userName.split(" ")[0][0].toUpperCase();
    const secondInitial = userName.split(" ")[1] ? userName.split(" ")[1][0].toUpperCase() : null;

    if (!secondInitial) {
      return firtsInitial;
    }

    return `${firtsInitial}${secondInitial}`;
  };

  const getName = (LocalIsLoading: boolean, userName: string) => {
    if (LocalIsLoading) {
      return "";
    }

    return userName;
  };

  const getEmail = (LocalIsLoading: boolean, email: string) => {
    if (LocalIsLoading) {
      return "";
    }

    return email;
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <div className={styles["avatar-content"]}>
          <AvatarRadix.Root className={styles["avatar-root"]}>
            <AvatarRadix.Image
              className="AvatarImage"
              src={data?.data.getArtist.avatar}
              alt="Colm Tuite"
            />
            <AvatarRadix.Fallback className={styles["avatar-fallback"]}>
              {getInitialFromName(isLoading, data?.data.getArtist.name)}
            </AvatarRadix.Fallback>
          </AvatarRadix.Root>
          <IconArrowDown />
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="DropdownMenuContent" sideOffset={5}>
          <DropdownMenu.Item
          className="grid grid-cols-[40px_1fr] items-center h-[72px] py-0 px-[16px]"
            // style={{
            //   display: "grid",
            //   gridTemplateColumns: "40px 1fr",
            //   alignItems: "center",
            //   height: "72px",
            //   padding: "0 16px",
            // }}
          >
            <AvatarRadix.Root className={styles["avatar-root-size"]}>
              <AvatarRadix.Fallback className={styles["avatar-fallback-size"]}>
                {getInitialFromName(isLoading, data?.data.getArtist.name)}
              </AvatarRadix.Fallback>
            </AvatarRadix.Root>
            <div
            className="grid grid-rows-[40px_16px] items-center"
              // style={{
              //   display: "grid",
              //   gridTemplateRows: "40px 16px",
              //   alignItems: "center",
              // }}
            >
              <div>{getName(isLoading, data?.data.getArtist.name)}</div>
              <div
              className="text-[13px] text-[#738393] font-normal"
                // style={{
                //   fontSize: "13px",
                //   color: "#738393",
                //   fontWeight: "400",
                // }}
              >
                {getEmail(isLoading, data?.data.getArtist.email)}
              </div>
            </div>
          </DropdownMenu.Item>
          <DropdownMenu.Separator className="DropdownMenuSeparator" />
          <DropdownMenu.Item className="DropdownMenuItem">
            <Link
            className="w-full h-full grid items-center text-[#394047] text-[16px] font-medium "
              // style={{
              //   width: "100%",
              //   height: "100%",
              //   display: "grid",
              //   alignItems: "center",
              //   color: "#394047",
              //   fontSize: "16px",
              //   fontWeight: "500",
              // }}
              href={`${process.env
                .NEXT_PUBLIC_BASE_URL_ECOMMERCE!}artist/${getName(
                isLoading,
                data?.data.getArtist.name.replace(/ /g, "-")
              )}/?page=1`}
            >
              Store
            </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Item className="DropdownMenuItem">
            <Link
            className="w-full h-full grid items-center text-[#394047] text-[14px]"
              // style={{
              //   width: "100%",
              //   height: "100%",
              //   display: "grid",
              //   alignItems: "center",
              //   color: "#394047",
              //   fontSize: "14px",
              // }}
              href="/dashboard2/settings/profile"
            >
              Your profile
            </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Separator className="DropdownMenuSeparator" />
          <DropdownMenu.Item className="DropdownMenuItem">
            <div
            className="w-full h-full grid items-center text-[#394047] text-[14px]"
              // style={{
              //   width: "100%",
              //   height: "100%",
              //   display: "grid",
              //   alignItems: "center",
              //   color: "#394047",
              //   fontSize: "14px",
              // }}
              onClick={() => {
                refetch();
              }}
            >
              Sign out
            </div>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
