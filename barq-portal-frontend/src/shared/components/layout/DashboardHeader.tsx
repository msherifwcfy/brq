import { Separator } from "@/shared/components/ui/separator";
import { SidebarTrigger, useSidebar } from "@/shared/components/ui/sidebar";
import { cn } from "@/shared/lib/utils";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Moon, Languages } from "lucide-react";
import { LogoutButton } from "@/features/auth";
import { useLang } from "@/shared/hooks/use-lang";
import { useLocation, useNavigate } from "react-router";

export function DashboardHeader({
  title = "dashboard.titles.dashboard",
  className,
}: {
  title?: string;
  className?: string;
}) {
  const { open, isMobile } = useSidebar();
  const isOpen = open && !isMobile;
  const { lang, t } = useLang();
  const isRTL = lang === "ar";
  const navigate = useNavigate();
  const location = useLocation();

  const handleToggleTheme = () => {
    const isLight = document.documentElement.classList.contains("light");
    if (isLight) {
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
    }
  };

  const handleToggleLanguage = () => {
    const otherLang = lang === "ar" ? "en" : "ar";
    const segments = location.pathname.split("/");
    const rest = segments.slice(2).join("/");
    const newPath = `/${otherLang}${rest ? "/" + rest : ""}`;
    navigate(newPath);
  };

  return (
    <motion.header
      animate={{
        left: isRTL ? undefined : isOpen ? "256px" : "0",
        right: !isRTL ? undefined : isOpen ? "256px" : "0",
        width: isOpen ? "calc(100% - 256px)" : "100%",
      }}
      initial={{
        left: isRTL ? undefined : isOpen ? "256px" : "0",
        right: !isRTL ? undefined : isOpen ? "0" : "256px",
        width: isOpen ? "calc(100% - 256px)" : "100%",
      }}
      transition={{ duration: 0.2, ease: "linear" }}
      className={cn(
        "fixed top-0 h-[60px] shrink-0 z-50 items-center gap-2 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/70",
        className
      )}
    >
      <div className="flex  h-full  w-full items-center justify-between gap-1 px-4 lg:gap-2 lg:px-6">
        <div className="flex items-center justify-start gap-2">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mx-2 data-[orientation=vertical]:h-4"
          />
          <h1 className="text-3xl font-bold">{t(title)}</h1>
        </div>
        <div className=" flex items-center gap-2">
          <Button onClick={handleToggleLanguage}>
            <Languages className="w-6 h-6" />
          </Button>
          <Button onClick={handleToggleTheme}>
            <Moon className="w-6 h-6" />
          </Button>
          <LogoutButton />
        </div>
      </div>
    </motion.header>
  );
}
