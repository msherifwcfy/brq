import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Alert, AlertDescription } from "@/shared/components/ui/alert";
import { Loader2, ArrowLeft, CheckCircle } from "lucide-react";
import {
  forgetPasswordSchema,
  type ForgetPasswordFormData,
} from "../schemas/auth.schema";
import { useAuthControllerForgetPassword } from "@/sdk/modules/auth.gen";
import { useLang } from "@/shared/hooks/use-lang";

interface ForgetPasswordFormProps {
  onBack?: () => void;
  onSuccess?: (email: string) => void;
}

export default function ForgetPasswordForm({
  onBack,
  onSuccess,
}: ForgetPasswordFormProps) {
  const [isSuccess, setIsSuccess] = useState(false);
  const { t } = useLang();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ForgetPasswordFormData>({
    resolver: zodResolver(forgetPasswordSchema),
  });

  const forgetPasswordMutation = useAuthControllerForgetPassword();

  const onSubmit = async (data: ForgetPasswordFormData) => {
    try {
      await forgetPasswordMutation.mutateAsync({
        body: {
          email: data.email,
        },
      });
      // setIsSuccess(true);
      if (onSuccess) {
        onSuccess(data.email);
      }
    } catch (error: any) {
      console.error("Forget password error:", error);
      setError("root", {
        message: error?.message || t("auth.errors.resetFailed"),
      });
    }
  };

  if (isSuccess) {
    return (
      <Card className="w-full max-w-md">
        <CardContent className="pt-6 text-center space-y-4">
          <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">
              {t("auth.forgotPassword.checkEmail")}
            </h3>
            <p className="text-muted-foreground">
              {t("auth.forgotPassword.emailSent")}
            </p>
          </div>
          {onBack && (
            <Button onClick={onBack} variant="outline" className="w-full">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t("auth.buttons.backToLogin")}
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">
          {t("auth.buttons.resetPassword")}
        </CardTitle>
        <p className="text-muted-foreground">
          {t("auth.forgotPassword.subtitle")}
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
            <Label htmlFor="email">{t("auth.forms.email")}</Label>
            <Input
              id="email"
              type="email"
              placeholder={t("auth.forms.emailPlaceholder")}
              {...register("email")}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={forgetPasswordMutation.isPending}
          >
            {forgetPasswordMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t("auth.buttons.sending")}
              </>
            ) : (
              t("auth.buttons.sendResetLink")
            )}
          </Button>

          {onBack && (
            <Button
              type="button"
              variant="ghost"
              onClick={onBack}
              className="w-full"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t("auth.buttons.backToLogin")}
            </Button>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
