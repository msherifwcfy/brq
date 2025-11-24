import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Alert, AlertDescription } from "@/shared/components/ui/alert";
import { Loader2, ArrowLeft } from "lucide-react";
import {
  verifyOtpSchema,
  type VerifyOtpFormData,
} from "../schemas/auth.schema";
import {
  useAuthControllerVerifyOtp,
  useAuthControllerResendOtp,
} from "@/sdk/modules/auth.gen";
import { useAuthStore } from "../auth.store";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/shared/components/ui/input-otp";
import { useLang } from "@/shared/hooks/use-lang";

interface VerifyOtpFormProps {
  email: string;
  onBack?: () => void;
  onSuccess?: () => void;
}

export default function VerifyOtpForm({
  email,
  onBack,
  onSuccess,
}: VerifyOtpFormProps) {
  const [countdown, setCountdown] = useState(0);
  const { setUser } = useAuthStore();
  const { t } = useLang();

  const {
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    watch,
  } = useForm<VerifyOtpFormData>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      email,
      otp: "",
    },
  });

  const verifyOtpMutation = useAuthControllerVerifyOtp();
  const resendOtpMutation = useAuthControllerResendOtp();

  const startCountdown = () => {
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleResendOtp = async () => {
    try {
      await resendOtpMutation.mutateAsync({
        body: { email },
      });
      startCountdown();
    } catch (error: any) {
      setError("root", {
        message: error?.message || t("auth.errors.resendFailed"),
      });
    }
  };

  const onSubmit = async (data: VerifyOtpFormData) => {
    try {
      (await verifyOtpMutation.mutateAsync({
        body: {
          email: data.email,
          otp: data.otp,
        },
      })) as any;
      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
      console.error("OTP verification error:", error);
      setError("root", {
        message: error?.message || t("auth.errors.invalidOtp"),
      });
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">
          {t("auth.otp.title")}
        </CardTitle>
        <p className="text-muted-foreground">
          {t("auth.otp.subtitle", { email })}
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {errors.root && (
            <Alert variant="destructive">
              <AlertDescription>{errors.root.message}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <div dir="ltr" className="flex justify-center mb-8">
              <InputOTP
                autoFocus
                maxLength={6}
                containerClassName="gap-4"
                value={watch("otp")}
                onChange={(value) => setValue("otp", value)}
              >
                <InputOTPGroup className="gap-4">
                  <InputOTPSlot
                    index={0}
                    className="border-input shadow-sm h-[38px] w-[42px]"
                  />
                  <InputOTPSlot
                    index={1}
                    className="border-input shadow-sm h-[38px] w-[42px]"
                  />
                  <InputOTPSlot
                    index={2}
                    className="border-input shadow-sm h-[38px] w-[42px]"
                  />
                  <InputOTPSlot
                    index={3}
                    className="border-input shadow-sm h-[38px] w-[42px]"
                  />
                </InputOTPGroup>
              </InputOTP>
            </div>

            {errors.otp && (
              <p className="text-sm text-red-500">{errors.otp.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={verifyOtpMutation.isPending}
          >
            {verifyOtpMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t("auth.buttons.verifying")}
              </>
            ) : (
              t("auth.buttons.verifyOtp")
            )}
          </Button>

          <div className="text-center flex justify-center space-x-2">
            <Button
              type="button"
              variant="secondary"
              onClick={handleResendOtp}
              disabled={countdown > 0 || resendOtpMutation.isPending}
              className="flex-1"
            >
              {resendOtpMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t("auth.buttons.sending")}
                </>
              ) : countdown > 0 ? (
                t("auth.buttons.resendIn", { count: countdown })
              ) : (
                t("auth.buttons.resendOtp")
              )}
            </Button>

            {onBack && (
              <Button
                type="button"
                variant="ghost"
                onClick={onBack}
                className="flex-1"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t("auth.buttons.backToLogin")}
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
