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
import { z } from "zod";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const { data, isLoading, mutate: login, isSuccess, isError, error } = useUserLogin();
  const [email, setEmail] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [zodError, setZodError] = React.useState<string | null>(null);
  const [loginError, setLoginError] = React.useState<string | null>(null);

  const router = useRouter();

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setZodError(null);
    setLoginError(null); // Reset any previous login errors

    // Define a Zod schema for a user object
    const userSchema = z.object({
      email: z.string().email(),
      pass: z.string()
        .min(8, 'Password must be at least 8 characters long')
        .max(32, 'Password cannot exceed 32 characters')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number')
        .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
    });

    const result = userSchema.safeParse({ email: email, pass: pass });

    if (result.success) {
      console.log("User data is valid:", result.data);
      login({ email: email, password: pass });
    } else {
      console.error("User data is invalid:", result.error.issues[0].message);
      setZodError(result.error.issues[0].message);
    }
  }

  // Handle login success and error
  React.useEffect(() => {
    if (isSuccess) {
      router.push("/dashboard");
    }
  }, [isSuccess]);

  React.useEffect(() => {
    if (isError && error) {
      setLoginError(error.response?.data?.message || "An unknown error occurred during login.");
    }
  }, [isError, error]);

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
            {zodError && <span className="text-red-400">{zodError}</span>}
            {loginError && <span className="text-red-400">{loginError}</span>}
          </div>
          <Button disabled={isLoading}>
            {isLoading ? <SyncLoader loading={isLoading} color="white" /> : "Sign In with Email"}
          </Button>
        </div>
      </form>
    </div>
  );
}
