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
        style={{
          height: "100vh",
          width: "100%",
          display: "grid",
          placeItems: "center",
        }}
      >
        <div
          style={{
            width: "400px",
            height: "200px",
            display: "grid",
            justifyItems: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontSize: "24px",
              fontWeight: "700",
              textAlign: "center",
            }}
          >
            Email Confirmation Needed
          </div>
          <div
            style={{
              fontSize: "16px",
              fontWeight: "500",
              textAlign: "center",
            }}
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
      style={{
        height: "100vh",
        width: "100%",
        display: "grid",
        placeItems: "center",
      }}
    >
      <div
        style={{
          width: "400px",
          height: "200px",
          display: "grid",
          justifyItems: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontSize: "24px",
            fontWeight: "700",
            color: "#14af67",
          }}
        >
          Congratulations!
        </div>
        <div
          style={{
            width: "64px",
            height: "64px",
            borderRadius: "64px",
            border: "2px solid #14af67",
            display: "grid",
            placeItems: "center",
            color: "#14af67",
          }}
        >
          <MailIcon />
        </div>
        <div
          style={{
            fontSize: "16px",
            fontWeight: "500",
            textAlign: "center",
          }}
        >
          You have confirmed you email successfully and now ready to log in to
          your account
        </div>
        <div
          style={{
            color: "#14af67",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "16px",
          }}
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
