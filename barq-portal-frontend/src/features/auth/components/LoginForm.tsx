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
import { Loader2 } from "lucide-react";
import { loginSchema, type LoginFormData } from "../schemas/auth.schema";
import { useAuthControllerSignin } from "@/sdk/modules/auth.gen";
import { useAuthStore } from "../auth.store";
import { useLang } from "@/shared/hooks/use-lang";

interface LoginFormProps {
  onEmailSubmit?: (email: string) => void;
  onForgetPassword?: () => void;
}

export default function LoginForm({
  onEmailSubmit,
  onForgetPassword,
}: LoginFormProps) {
  const { setUser } = useAuthStore();
  const { t, lang } = useLang();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const signinMutation = useAuthControllerSignin();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = (await signinMutation.mutateAsync({
        body: {
          email: data.email,
          password: data.password,
        },
      })) as any;

      if (response?.data) {
        const tokensData = response.data as any;
        if (tokensData) {
          const { access_token, refresh_token } = tokensData;
          localStorage.setItem("access_token", access_token);
          localStorage.setItem("refresh_token", refresh_token);

          window.location.href = `/${lang}/`;
        }
      }
    } catch (error: any) {
      console.error("Login error:", error);
      setError("root", {
        message: error?.message || t("auth.errors.loginFailed"),
      });
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">
          {t("auth.welcome.back")}
        </CardTitle>
        <p className="text-muted-foreground">{t("auth.welcome.signIn")}</p>
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

          <div className="space-y-2">
            <Label htmlFor="password">{t("auth.forms.password")}</Label>
            <Input
              id="password"
              type="password"
              placeholder={t("auth.forms.passwordPlaceholder")}
              {...register("password")}
              className={errors.password ? "border-red-500" : ""}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={signinMutation.isPending}
          >
            {signinMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t("auth.buttons.signingIn")}
              </>
            ) : (
              t("auth.buttons.signIn")
            )}
          </Button>

          {onForgetPassword && (
            <div className="text-center">
              <Button
                type="button"
                variant="link"
                onClick={onForgetPassword}
                className="text-sm text-muted-foreground hover:text-primary"
              >
                {t("auth.buttons.forgotPassword")}
              </Button>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
