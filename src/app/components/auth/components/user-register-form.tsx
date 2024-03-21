"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
// import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserLogin } from "@/app/login/useUserLogin";
import { useRouter } from "next/navigation";
import { useUserRegister } from "@/app/register/useUserRegister";
import { useForm, SubmitHandler } from "react-hook-form";
import SyncLoader from "react-spinners/SyncLoader";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}
export function UserRegisterForm({ className, ...props }: UserAuthFormProps) {
  const {
    data,
    isLoading,
    mutate: registerUser,
    isSuccess,
    isError,
  } = useUserRegister();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => registerUser({ ...data });

  const router = useRouter();

  React.useEffect(() => {
    if (isSuccess) {
      router.push("/login");
    }
  }, [isSuccess]);

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Name
            </Label>
            <Input
              id="name"
              placeholder="Patrick Jane"
              type="name"
              autoCapitalize="none"
              autoComplete="name"
              autoCorrect="off"
              disabled={isLoading}
              {...register("name", { required: true, min: 3 })}
            />
            {errors.name && <span>name is required, min 3 letters </span>}
          </div>
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
              {...register("email", { required: true })}
            />
            {errors.email && <span>email is required</span>}
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
              {...register("password", { required: true })}
            />
            {errors.password && <span>password is required</span>}
          </div>
          <Button disabled={isLoading}>
            {isLoading ? (
              <SyncLoader loading={isLoading} color="white" />
            ) : (
              "Create Account"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
