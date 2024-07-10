import { useParams } from "next/navigation";

export default function EmailNotConfirm() {
  const params = useParams();
  console.log("params", params);
  return (
    <>
      <div
       className="w-full h-full grid justify-items-center items-center"
      >
        <div
        className="text-2xl font-bold"
        >
          Email Confirmation Needed
        </div>
        <div
        className="text-base font-medium"
        >
          Please check your inbox and click the verification link to activate
          your account.
        </div>
      </div>
    </>
  );
}
