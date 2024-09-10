"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
// import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserRegister } from "@/app/register/useUserRegister";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import SyncLoader from "react-spinners/SyncLoader";
import { z } from "zod";

// Define the Zod schema for registration data
const userSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().min(3, "Name must be at least 3 characters long"),
  password: z.string()
    .min(8, "Password must be at least 8 characters long")
    .max(32, "Password cannot exceed 32 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
});

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function UserRegisterForm({ className, ...props }: UserAuthFormProps) {
  const { data, isLoading, mutate: registerUser, isSuccess, isError, error } = useUserRegister();
  const router = useRouter();

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [zodError, setZodError] = React.useState<string | null>(null);
  const [registrationError, setRegistrationError] = React.useState<string | null>(null);

  // Handle form submission
  const onSubmit = (formData: any) => {
    setZodError(null); // Reset Zod validation errors
    setRegistrationError(null); // Reset registration errors

    // Perform Zod validation manually
    const result = userSchema.safeParse(formData);

    if (!result.success) {
      // Set the Zod validation error
      setZodError(result.error.issues[0].message);
      return; // Don't proceed with submission if Zod validation fails
    }

    // If validation is successful, proceed with registration
    registerUser(result.data);
  };

  // Handle success: Redirect to login after successful registration
  React.useEffect(() => {
    if (isSuccess) {
      router.push("/login");
    }
  }, [isSuccess]);

  // Handle errors after the mutation completes
  React.useEffect(() => {
    if (isError && error) {
      setRegistrationError(error.response?.data?.message || "An unknown error occurred.");
    }
  }, [isError, error]);

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          {/* Name field */}
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="name">
              Name
            </Label>
            <Input
              id="name"
              placeholder="Patrick Jane"
              type="text"
              autoCapitalize="none"
              autoComplete="name"
              autoCorrect="off"
              disabled={isLoading}
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && <span className="text-red-400">{errors.name.message}</span>}
          </div>

          {/* Email field */}
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
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <span className="text-red-400">{errors.email.message}</span>}
          </div>

          {/* Password field */}
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
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && <span className="text-red-400">{errors.password.message}</span>}
          </div>

          {/* Display Zod validation error */}
          {zodError && <span className="text-red-400">{zodError}</span>}

          {/* Display backend registration error */}
          {registrationError && <span className="text-red-400">{registrationError}</span>}

          <Button disabled={isLoading}>
            {isLoading ? <SyncLoader loading={isLoading} color="white" /> : "Create Account"}
          </Button>
        </div>
      </form>
    </div>
  );
}
