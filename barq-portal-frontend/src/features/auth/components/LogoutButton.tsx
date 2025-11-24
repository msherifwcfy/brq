import { Button } from "@/shared/components/ui/button";
import { LogOut } from "lucide-react";
import { useLogout } from "../hooks/useLogout";
import { useLang } from "@/shared/hooks/use-lang";

export default function LogoutButton() {
  const { logout, isLoggingOut } = useLogout();
  const { t } = useLang();

  return (
    <Button
      variant="outline"
      onClick={logout}
      disabled={isLoggingOut}
      className="flex items-center gap-2"
    >
      <LogOut className="h-4 w-4" />
      {isLoggingOut ? t("auth.buttons.loggingOut") : t("auth.buttons.logout")}
    </Button>
  );
}
