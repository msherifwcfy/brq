import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/shared/components/ui/sidebar";
import { useLang } from "@/shared/hooks/use-lang";
import { useRBAC, useRoleSidebar } from "@/shared/providers/RBACProvider";
import { MoreHorizontal, ChevronDown, ChevronUp } from "lucide-react";
import { Link, useLocation } from "react-router";
import { LangLink } from "../custom/LangLink";
import { useState } from "react";

function DashboardSidebar() {
  const { isMobile } = useSidebar();
  const { canAccess } = useRBAC();
  const sidebarItems = useRoleSidebar();
  const { t, lang } = useLang();
  const { pathname } = useLocation();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  // Check if current language is RTL
  const isRTL = lang === "ar";

  const isActive = (path: string) => {
    return pathname === path;
  };

  const isAnyChildActive = (children: any[] | undefined) => {
    if (!children) return false;
    return children.some((c) => pathname === c.path);
  };

  // Filter sidebar items based on permissions
  const filterSidebarItems = (items: typeof sidebarItems) => {
    return items.filter((item) => {
      if (!item.requiredPermissions) return true;
      return canAccess(item.requiredPermissions);
    });
  };

  const filteredSidebarItems = filterSidebarItems(sidebarItems);

  const handleToggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <Sidebar
      side={isRTL ? "right" : "left"}
      className="bg-transparent border-r-0"
    >
      <SidebarContent
        className={`gap-4 bg-gradient-to-b from-background via-muted/50 to-muted/10 border-none py-4 ${
          isRTL ? "border-l" : "border-r"
        }`}
      >
        <div className={`p-4 ${isRTL ? "pr-8" : "px-8"}`}>
          <LangLink to={`/dashboard`} className="z-10">
            <img src="/logo.svg" alt="logo" />
          </LangLink>
        </div>

        <SidebarGroup className="px-2">
          <SidebarGroupLabel className="uppercase tracking-wide opacity-70 mb-2">
            {t("dashboard.sidebar.mainNavigation")}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {filteredSidebarItems.map((link, index) => {
                const hasChildren = !!(link.children && link.children.length);
                const active =
                  isActive(link.path) || isAnyChildActive(link.children ?? []);
                const sectionKey = link.path || String(index);
                const isOpen = openSections[sectionKey] ?? active;

                if (hasChildren) {
                  const visibleChildren = (link.children ?? []).filter(
                    (child: any) => {
                      if (!child.requiredPermissions) return true;
                      return canAccess(child.requiredPermissions);
                    }
                  );

                  return (
                    <SidebarMenuItem key={index}>
                      <SidebarMenuButton
                        size="lg"
                        isActive={active}
                        className={`w-full text-start flex items-center justify-between ${
                          active ? "font-bold" : ""
                        }`}
                        onClick={() => handleToggleSection(sectionKey)}
                      >
                        <div className={`flex items-center gap-2`}>
                          <div
                            className={`flex items-center justify-center w-8 h-8 ${
                              isRTL ? "ml-1" : "mr-1"
                            }`}
                          >
                            <link.icon className="h-6 w-6" />
                          </div>
                          <span className="text-base">{t(link.label)}</span>
                        </div>
                        {isOpen ? (
                          <ChevronUp
                            className={`h-4 w-4 ${
                              isRTL ? "mr-auto" : "ml-auto"
                            }`}
                          />
                        ) : (
                          <ChevronDown
                            className={`h-4 w-4 ${
                              isRTL ? "mr-auto" : "ml-auto"
                            }`}
                          />
                        )}
                      </SidebarMenuButton>

                      {isOpen && (
                        <SidebarMenuSub>
                          {visibleChildren.map(
                            (child: any, childIdx: number) => (
                              <SidebarMenuSubItem key={childIdx}>
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={isActive(child.path)}
                                >
                                  <LangLink
                                    to={child.path}
                                    className={`flex items-center `}
                                  >
                                    <child.icon
                                      className={`h-4 w-4 ${
                                        isRTL ? "ml-2" : "mr-2"
                                      }`}
                                    />
                                    <span>{t(child.label)}</span>
                                  </LangLink>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            )
                          )}
                        </SidebarMenuSub>
                      )}
                    </SidebarMenuItem>
                  );
                }

                return (
                  <SidebarMenuItem key={index}>
                    <SidebarMenuButton
                      asChild
                      size="lg"
                      isActive={active}
                      className={`w-full text-start ${
                        active ? "font-bold" : ""
                      }`}
                    >
                      <LangLink to={link.path} className={`flex items-center`}>
                        <div
                          className={`flex items-center justify-center w-8 h-8 ${
                            isRTL ? "ml-1" : "mr-1"
                          }`}
                        >
                          <link.icon className="h-6 w-6" />
                        </div>
                        <span className="text-base">{t(link.label)}</span>
                      </LangLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export default DashboardSidebar;
