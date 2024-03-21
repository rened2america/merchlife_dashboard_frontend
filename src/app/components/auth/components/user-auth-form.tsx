"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
// import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserLogin } from "@/app/login/useUserLogin";
import { useRouter } from "next/navigation";
import SyncLoader from "react-spinners/SyncLoader";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const { data, isLoading, mutate: login, isSuccess, isError } = useUserLogin();
  const [email, setEmail] = React.useState("");
  const [pass, setPass] = React.useState("");

  const router = useRouter();
  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    login({ email: email, password: pass });
  }

  React.useEffect(() => {
    if (isSuccess) {
      router.push("/dashboard2");
    }
  }, [isSuccess]);

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="**********"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={isLoading}
              onChange={(event) => setPass(event.target.value)}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading ? (
              <SyncLoader loading={isLoading} color="white" />
            ) : (
              "Sign In with Email"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
