import { useParams } from "next/navigation";

export default function EmailNotConfirm() {
  const params = useParams();
  console.log("params", params);
  return (
    <>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "grid",
          justifyItems: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontSize: "24px",
            fontWeight: "700",
          }}
        >
          Email Confirmation Needed
        </div>
        <div
          style={{
            fontSize: "16px",
            fontWeight: "500",
          }}
        >
          Please check your inbox and click the verification link to activate
          your account.
        </div>
      </div>
    </>
  );
}
