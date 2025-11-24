import { PERMISSION_KEYS } from "@/shared/config/permissions";
import {
  type Permission,
  type RoleConfig,
  type SidebarItem,
} from "@/shared/types/rbac";
import {
  Home,
  Layout,
  Shield,
  TableOfContents,
  UserCheck,
  Users,
  Handshake,
  Building2,
  Users2,
  Globe2,
  Factory,
  Rocket,
  Award,
  Database,
  BookOpen,
  GraduationCap,
  Newspaper,
  Calendar,
  Megaphone,
  FileText,
  Contact,
} from "lucide-react";
import { Footer } from "react-day-picker";

// Default sidebar items based on permissions
const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    path: "/",
    icon: Home,
    label: "dashboard.sidebar.home",
    // requiredPermissions: [PERMISSION_KEYS.DASHBOARD.VIEW],
    exactMatch: true,
  },
  {
    path: "/dashboard/employees",
    icon: Users,
    label: "dashboard.sidebar.employeeManagement",
    requiredPermissions: [PERMISSION_KEYS.ROLES.VIEW],
    children: [
      {
        path: "/dashboard/employees",
        icon: UserCheck,
        label: "dashboard.sidebar.employees",
        requiredPermissions: [PERMISSION_KEYS.USERS.VIEW],
      },
      {
        path: "/dashboard/roles",
        icon: Shield,
        label: "dashboard.sidebar.roles",
      },
    ],
  },
  {
    path: "/dashboard/cms",
    icon: TableOfContents,
    label: "dashboard.sidebar.cms.title",
    children: [
      {
        path: "/dashboard/cms/home-page",
        icon: Home,
        label: "dashboard.sidebar.cms.homePage.title",
        requiredPermissions: [
          PERMISSION_KEYS.HERO.VIEW,
          PERMISSION_KEYS.WHO_ARE_WE.VIEW,
        ],
      },

      {
        path: "/dashboard/cms/alliances",
        icon: Handshake,
        label: "dashboard.sidebar.alliances.title",
        requiredPermissions: [
          PERMISSION_KEYS.ALLIANCES_HEAD.VIEW,
          PERMISSION_KEYS.ALLIANCES_CLIENTS.VIEW,
          PERMISSION_KEYS.ALLIANCES_VENDORS.VIEW,
        ],
      },
      {
        path: "/dashboard/cms/awards",
        icon: Award,
        label: "dashboard.sidebar.awards.title",
        requiredPermissions: [
          PERMISSION_KEYS.AWARDS_CARDS.VIEW,
          PERMISSION_KEYS.AWARDS_HEAD.VIEW,
        ],
      },
      {
        path: "/dashboard/cms/sustainability",
        icon: Globe2,
        label: "dashboard.sidebar.sustainability.title",
        requiredPermissions: [PERMISSION_KEYS.HERO.VIEW],
      },
      {
        path: "/dashboard/cms/automation",
        icon: Database,
        label: "dashboard.sidebar.automation.title",
        requiredPermissions: [PERMISSION_KEYS.AUTOMATION_HERO.VIEW],
      },
      {
        path: "/dashboard/cms/cybersecurity",
        icon: Shield,
        label: "dashboard.sidebar.cybersecurity.title",
        requiredPermissions: [
          PERMISSION_KEYS.CYBERSECURITY_HERO.VIEW,
          PERMISSION_KEYS.NETWORK_SECTION.VIEW,
          PERMISSION_KEYS.CYBERSECURITY_DATA_CENTER.VIEW,
          PERMISSION_KEYS.OPERATION_INTELLIGENCE.VIEW,
          PERMISSION_KEYS.IDENTITY_MANAGEMENT.VIEW,
          PERMISSION_KEYS.APPLICATION_DATA.VIEW,
        ],
      },
      {
        path: "/dashboard/cms/it-infrastructure",
        icon: Database,
        label: "dashboard.sidebar.cms.itInfrastructure.title",
        requiredPermissions: [
          PERMISSION_KEYS.IT_INFRASTRUCTURE_HERO.VIEW,
          PERMISSION_KEYS.DATA_CENTER.VIEW,
          PERMISSION_KEYS.MOBILITY.VIEW,
          PERMISSION_KEYS.SOFTWARE_DEFINED_NETWORK.VIEW,
        ],
      },
      {
        path: "/dashboard/cms/footer",
        icon: Footer,
        label: "dashboard.sidebar.footer.title",
        requiredPermissions: [
          PERMISSION_KEYS.FOOTER_CONTACTS.VIEW,
          PERMISSION_KEYS.FOOTER_LOCATIONS.VIEW,
        ],
      },
      {
        path: "/dashboard/cms/about-us",
        icon: BookOpen,
        label: "dashboard.sidebar.cms.aboutUs.title",
      },
      {
        path: "/dashboard/cms/academy",
        icon: GraduationCap,
        label: "dashboard.sidebar.cms.academy.title",
      },
      {
        path: "/dashboard/cms/managed-services",
        icon: Shield,
        label: "dashboard.sidebar.cms.managedServices.title",
      },
      {
        path: "/dashboard/cms/newsroom",
        icon: Newspaper,
        label: "dashboard.sidebar.cms.newsroom.title",
      },
      {
        path: "/dashboard/cms/contact-us",
        icon: Contact,
        label: "dashboard.sidebar.contactUs.title",
      },
      {
        path: "/dashboard/cms/events",
        icon: Calendar,
        label: "dashboard.sidebar.cms.events.title",
      },
      {
        path: "/dashboard/cms/campaigns",
        icon: Megaphone,
        label: "dashboard.sidebar.cms.campaigns.title",
      },
      {
        path: "/dashboard/cms/resources",
        icon: FileText,
        label: "dashboard.sidebar.cms.resources.title",
      },
    ],
    // requiredPermissions: [PERMISSION_KEYS.CMS.VIEW],
  },
  {
    path: "/dashboard/manage-items",
    icon: Building2,
    label: "dashboard.sidebar.manageItems",
    requiredPermissions: [
      PERMISSION_KEYS.COUNTRIES.VIEW,
      PERMISSION_KEYS.INDUSTRIES.VIEW,
      PERMISSION_KEYS.SOLUTIONS.VIEW,
    ],
    children: [
      {
        path: "/dashboard/countries",
        icon: Globe2,
        label: "dashboard.sidebar.countries.title",
        requiredPermissions: [PERMISSION_KEYS.COUNTRIES.VIEW],
      },
      {
        path: "/dashboard/industries",
        icon: Factory,
        label: "dashboard.sidebar.industries.title",
        requiredPermissions: [PERMISSION_KEYS.INDUSTRIES.VIEW],
      },
      {
        path: "/dashboard/solutions",
        icon: Rocket,
        label: "dashboard.sidebar.solutions.title",
        requiredPermissions: [PERMISSION_KEYS.SOLUTIONS.VIEW],
      },
    ],
  },
];

// Default theme for dynamic roles
const DEFAULT_THEME = {
  primaryColor: "blue",
  accentColor: "blue-600",
  sidebarStyle: "default" as const,
  sidebar: {
    backgroundColor: "bg-white",
    hoverTextColor: "text-muted",
    selectedBackgroundColor: "bg-secondary",
    logoColor: "primary",
  },
};

/**
 * Generate features object based on permissions
 */
function generateFeatures(permissions: Permission[]): Record<string, boolean> {
  const permissionKeys = permissions.map((p) => p);

  return {
    canManageUsers: permissionKeys.some(
      (key) => key.includes("users") && key.includes("manage")
    ),
    canManageRoles: permissionKeys.some(
      (key) => key.includes("roles") && key.includes("manage")
    ),
    canManagePermissions: permissionKeys.some(
      (key) => key.includes("permissions") && key.includes("manage")
    ),
    canViewAnalytics: permissionKeys.some(
      (key) => key.includes("dashboard") && key.includes("view")
    ),
    canManageProjects: permissionKeys.some(
      (key) => key.includes("projects") && key.includes("manage")
    ),
    canManageCategories: permissionKeys.some(
      (key) => key.includes("categories") && key.includes("manage")
    ),
    canManageAdmins: permissionKeys.some(
      (key) => key.includes("admins") && key.includes("manage")
    ),
    canSendMessages: permissionKeys.some(
      (key) => key.includes("messages") && key.includes("send")
    ),
    canManageChat: permissionKeys.some(
      (key) => key.includes("chat") && key.includes("manage")
    ),
  };
}

/**
 * Filter sidebar items based on user permissions
 */
function filterSidebarItems(
  items: SidebarItem[],
  permissions: Permission[]
): SidebarItem[] {
  const permissionKeys = permissions.map((p) => p);

  return items.filter((item) => {
    // If item has no required permissions, show it
    if (!item.requiredPermissions || item.requiredPermissions.length === 0) {
      return true;
    }

    // Check if user has any of the required permissions
    const hasPermission = item.requiredPermissions.some((reqPerm) =>
      permissionKeys.includes(reqPerm)
    );

    if (hasPermission) {
      // If item has children, filter them recursively
      if (item.children) {
        item.children = filterSidebarItems(item.children, permissions);
      }
      return true;
    }

    return false;
  });
}

/**
 * Recursively find the first accessible route path from sidebar items
 */
function findFirstAccessiblePath(items: SidebarItem[]): string | null {
  for (const item of items) {
    if (item.path && !item.children) {
      return item.path;
    }
    if (item.children && item.children.length > 0) {
      const childPath = findFirstAccessiblePath(item.children);
      if (childPath) return childPath;
    }
    // If item has both path and children, prefer the path
    if (item.path && item.children && item.children.length > 0) {
      return item.path;
    }
  }
  return null;
}

/**
 * Generate a dynamic role configuration based on role key and permissions
 */
export function generateDynamicRoleConfig(
  roleKey: string,
  permissions: Permission[]
): RoleConfig {
  const filteredSidebar = filterSidebarItems(SIDEBAR_ITEMS, permissions);
  const features = generateFeatures(permissions);

  return {
    role: roleKey,
    displayName:
      roleKey.charAt(0).toUpperCase() + roleKey.slice(1).toLowerCase(),
    defaultRoute: "/",
    theme: DEFAULT_THEME,
    sidebar: filteredSidebar,
    features,
    isStatic: false,
  };
}

/**
 * Check if a role has access to a specific route
 */
export function hasRouteAccess(
  route: string,
  permissions: Permission[]
): boolean {
  const permissionKeys = permissions.map((p) => p);

  // Find the sidebar item for this route
  const findRouteItem = (items: SidebarItem[]): SidebarItem | null => {
    for (const item of items) {
      if (item.path === route) {
        return item;
      }
      if (item.children) {
        const childItem = findRouteItem(item.children);
        if (childItem) return childItem;
      }
    }
    return null;
  };

  const routeItem = findRouteItem(SIDEBAR_ITEMS);
  if (!routeItem || !routeItem.requiredPermissions) {
    return true; // No specific permissions required
  }

  return routeItem.requiredPermissions.some((reqPerm) =>
    permissionKeys.includes(reqPerm)
  );
}

/**
 * Get the first accessible dashboard route for the user based on permissions
 */
export function getFirstAccessibleDashboardRoute(
  permissions: Permission[]
): string {
  const filteredSidebar = filterSidebarItems(SIDEBAR_ITEMS, permissions);
  const firstPath = findFirstAccessiblePath(filteredSidebar);
  return firstPath || "/";
}
