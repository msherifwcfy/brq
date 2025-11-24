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
import { Loader2, CheckCircle } from "lucide-react";
import {
  completePasswordSchema,
  type CompletePasswordFormData,
} from "../schemas/auth.schema";
import { useAuthControllerCompleteForgetPassword } from "@/sdk/modules/auth.gen";
import { useState } from "react";
import { useLang } from "@/shared/hooks/use-lang";

interface CompletePasswordFormProps {
  email: string;
  onSuccess?: () => void;
}

export default function CompletePasswordForm({
  email,
  onSuccess,
}: CompletePasswordFormProps) {
  const [isSuccess, setIsSuccess] = useState(false);
  const { t } = useLang();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<CompletePasswordFormData>({
    resolver: zodResolver(completePasswordSchema),
    defaultValues: { email },
  });

  const completePasswordMutation = useAuthControllerCompleteForgetPassword();

  const onSubmit = async (data: CompletePasswordFormData) => {
    try {
      await completePasswordMutation.mutateAsync({
        body: {
          email: data.email,
          password: data.password,
        },
      });
      setIsSuccess(true);
      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
      console.error("Complete password error:", error);
      setError("root", {
        message: error?.message || t("auth.errors.updateFailed"),
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
              {t("auth.completePassword.success")}
            </h3>
            <p className="text-muted-foreground">
              {t("auth.completePassword.successMessage")}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">
          {t("auth.buttons.setNewPassword")}
        </CardTitle>
        <p className="text-muted-foreground">
          {t("auth.completePassword.subtitle")}
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
            <Label htmlFor="password">{t("auth.forms.newPassword")}</Label>
            <Input
              id="password"
              type="password"
              placeholder={t("auth.forms.newPasswordPlaceholder")}
              {...register("password")}
              className={errors.password ? "border-red-500" : ""}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">
              {t("auth.forms.confirmPassword")}
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder={t("auth.forms.confirmPasswordPlaceholder")}
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
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t("auth.buttons.updating")}
              </>
            ) : (
              t("auth.buttons.updatePassword")
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
