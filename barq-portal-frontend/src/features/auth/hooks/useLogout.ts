import { useAuthControllerLogout } from "@/sdk/modules/auth.gen";
import { useAuthStore } from "../auth.store";
import { useLangNavigate } from "@/shared/hooks/use-lang-navigate";

export const useLogout = () => {
  const logoutMutation = useAuthControllerLogout();
  const { logout: logoutStore } = useAuthStore();
  const navigate = useLangNavigate();

  const logout = async () => {
    try {
      await logoutMutation.mutateAsync({});
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    } catch (error) {
      console.error("Logout API error:", error);
    } finally {
      await logoutStore();
      navigate("/auth/login");
    }
  };

  return {
    logout,
    isLoggingOut: logoutMutation.isPending,
  };
};
