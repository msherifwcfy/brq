import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Alert, AlertDescription } from "@/shared/components/ui/alert";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Loader2, CheckCircle, Link2, RefreshCw } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  useAuthControllerVerifyLink,
  useAuthControllerResendLink,
  useAuthControllerCompletePassword,
} from "@/sdk/modules/auth.gen";

const createPasswordSchema = z
  .object({
    email: z.string().email("Please enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character"
      ),
    confirmPassword: z.string().min(8, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type CreatePasswordFormData = z.infer<typeof createPasswordSchema>;

function useQueryParam(name: string) {
  const { search } = useLocation();
  return useMemo(
    () => new URLSearchParams(search).get(name) ?? "",
    [search, name]
  );
}

export default function CreatePassword() {
  const token = useQueryParam("token");
  const identifier = useQueryParam("identifier");
  const navigate = useNavigate();

  const [isVerified, setIsVerified] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  const [rootError, setRootError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const verifyLinkMutation = useAuthControllerVerifyLink();
  const resendLinkMutation = useAuthControllerResendLink();
  const completePasswordMutation = useAuthControllerCompletePassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<CreatePasswordFormData>({
    resolver: zodResolver(createPasswordSchema),
    defaultValues: { email: identifier },
  });

  useEffect(() => {
    const verify = async () => {
      setRootError(null);
      try {
        const res = await verifyLinkMutation.mutateAsync({
          body: { token },
        } as any);
        setIsVerified(true);
        setIsExpired(false);
      } catch (e: any) {
        setIsVerified(false);
        setIsExpired(true);
        setRootError(e?.message || "Link verification failed or expired.");
      }
    };
    if (token) verify();
  }, [token]);

  const handleResend = async () => {
    setRootError(null);
    try {
      await resendLinkMutation.mutateAsync({
        body: { email: identifier },
      } as any);
    } catch (e: any) {
      setRootError(e?.message || "Failed to resend link. Please try again.");
    }
  };

  const onSubmit = async (data: CreatePasswordFormData) => {
    try {
      await completePasswordMutation.mutateAsync({
        body: { token, email: data.email, password: data.password },
      } as any);
      setSuccess(true);
    } catch (error: any) {
      setError("root", {
        message:
          error?.message || "Failed to create password. Please try again.",
      });
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-muted/30">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center space-y-4">
            <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Password Created!</h3>
              <p className="text-muted-foreground">
                Your account is ready. You can now sign in with your new
                password.
              </p>
            </div>
            <Button className="w-full" onClick={() => navigate("/auth/login")}>
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-muted/30">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Create Password</CardTitle>
          <p className="text-muted-foreground">
            Verify your link and set your password.
          </p>
        </CardHeader>
        <CardContent>
          {rootError && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{rootError}</AlertDescription>
            </Alert>
          )}

          {!isVerified && !isExpired && (
            <div className="space-y-4">
              <Button disabled className="w-full" variant="secondary">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Verifying
                link...
              </Button>
            </div>
          )}

          {isExpired && (
            <div className="space-y-4 text-center">
              <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                <Link2 className="h-4 w-4" />
                <span>This link is expired.</span>
              </div>
              <Button
                type="button"
                onClick={handleResend}
                disabled={resendLinkMutation.isPending}
                className="w-full"
              >
                {resendLinkMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
                  </>
                ) : (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" /> Resend Link
                  </>
                )}
              </Button>
            </div>
          )}

          {isVerified && (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {errors.root && (
                <Alert variant="destructive">
                  <AlertDescription>{errors.root.message}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  disabled
                  {...register("email")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  {...register("password")}
                  className={errors.password ? "border-red-500" : ""}
                />
                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm password"
                  {...register("confirmPassword")}
                  className={errors.confirmPassword ? "border-red-500" : ""}
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={completePasswordMutation.isPending}
              >
                {completePasswordMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                    Creating...
                  </>
                ) : (
                  "Create Password"
                )}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
