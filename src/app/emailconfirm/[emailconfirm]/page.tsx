"use client";
import { MailIcon } from "@/app/components/icons/MailIcon";
import { useGetEmailConfirm } from "@/hooks/useEmail";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import SyncLoader from "react-spinners/SyncLoader";

export default function EmailNotConfirm() {
  const params = useParams();
  const router = useRouter();
  const { isLoading, isError, refetch } = useGetEmailConfirm(
    params.emailconfirm
  );
  if (isLoading) {
    return (
      <div>
        <SyncLoader loading={isLoading} color="black" />
      </div>
    );
  }

  if (isError) {
    return (
      <div
      className="h-[100vh] w-[100vh] grid place-content-center"
      >
        <div
        className="w-[400px] h-[200px] grid justify-items-center items-center "
        >
          <div
          className="text-[24px] font-bold text-center"
          >
            Email Confirmation Needed
          </div>
          <div
          className="text-[16px] font-medium text-center"
          >
            Please check your inbox and click the verification link to activate
            your account.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
    className="h-[100vh] w-full grid place-items-center"
    >
      <div
      className="w-[400px] h-[200px] grid justify-items-center items-center"
      >
        <div
        className="text-2xl font-bold text-[#14af67]"
        >
          Congratulations!
        </div>
        <div
        className="w-[64px] h-[64px] rounded-[64px] border-2 border-solid border-[#14af67] grid place-items-center text-[#14af67]"
        >
          <MailIcon />
        </div>
        <div
        className="text-base font-medium text-center"
        >
          You have confirmed you email successfully and now ready to log in to
          your account
        </div>
        <div
        className="text-[#14af67] cursor-pointer font-semibold text-base"
          onClick={() => {
            router.push("/login");
          }}
        >
          Log in
        </div>
      </div>
    </div>
  );
}
