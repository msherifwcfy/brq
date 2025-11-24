import { type Permission, type PermissionResource } from "@/shared/types/rbac";

export const PERMISSION_KEYS = {
  ROLES: {
    VIEW: "view_roles",
    CREATE: "create_roles",
    UPDATE: "update_roles",
    DELETE: "delete_roles",
  },
  PERMISSIONS: {
    VIEW: "view_permissions",
    UPDATE: "update_permissions",
  },
  ROLES_PERMISSIONS: {
    VIEW: "view_roles_permissions",
    UPDATE: "update_roles_permissions",
  },
  USERS: {
    VIEW: "view_users",
    UPDATE: "update_users",
    DELETE: "delete_users",
    CREATE: "create_users",
  },
  HERO: {
    VIEW: "view_hero",
    UPDATE: "update_hero",
    CREATE: "create_hero",
  },
  WHO_ARE_WE: {
    VIEW: "view_who_are_we",
    UPDATE: "update_who_are_we",
    CREATE: "create_who_are_we",
  },
  LANDING_NUMBERS: {
    VIEW: "view_landing_numbers",
    UPDATE: "update_landing_numbers",
    CREATE: "create_landing_numbers",
    DELETE: "delete_landing_numbers",
  },
  LEADERSHIP: {
    VIEW: "view_leadership",
    UPDATE: "update_leadership",
    CREATE: "create_leadership",
  },
  ALLIANCES_HEAD: {
    VIEW: "view_alliances_head",
    UPDATE: "update_alliances_head",
    CREATE: "create_alliances_head",
    DELETE: "delete_alliances_head",
  },
  ALLIANCES_CLIENTS: {
    VIEW: "view_alliances_clients",
    UPDATE: "update_alliances_clients",
    CREATE: "create_alliances_clients",
    DELETE: "delete_alliances_clients",
  },
  ALLIANCES_VENDORS: {
    VIEW: "view_alliances_vendors",
    UPDATE: "update_alliances_vendors",
    CREATE: "create_alliances_vendors",
    DELETE: "delete_alliances_vendors",
  },
  COUNTRIES: {
    VIEW: "view_country",
    UPDATE: "update_country",
    CREATE: "create_country",
    DELETE: "delete_country",
  },
  INDUSTRIES: {
    VIEW: "view_industries",
    UPDATE: "update_industries",
    CREATE: "create_industries",
    DELETE: "delete_industries",
  },
  SOLUTIONS: {
    VIEW: "view_solutions",
    UPDATE: "update_solutions",
    CREATE: "create_solutions",
    DELETE: "delete_solutions",
  },
  AWARDS_CARDS: {
    VIEW: "view_awards_cards",
    UPDATE: "update_awards_cards",
    CREATE: "create_awards_cards",
    DELETE: "delete_awards_cards",
  },
  AWARDS_HEAD: {
    VIEW: "view_awards_head",
    UPDATE: "update_awards_head",
    CREATE: "create_awards_head",
    DELETE: "delete_awards_head",
  },
  FOOTER_CONTACTS: {
    VIEW: "view_footer_contacts",
    UPDATE: "update_footer_contacts",
    CREATE: "create_footer_contacts",
    DELETE: "delete_footer_contacts",
  },
  FOOTER_LOCATIONS: {
    VIEW: "view_footer_locations",
    UPDATE: "update_footer_locations",
    CREATE: "create_footer_locations",
    DELETE: "delete_footer_locations",
  },
  SUSTAINABILITY_CARD_SOCIAL: {
    VIEW: "view_card_social",
    UPDATE: "update_card_social",
    CREATE: "create_card_social",
    DELETE: "delete_card_social",
  },
  AUTOMATION_HERO: {
    VIEW: "view_automation_hero",
    UPDATE: "update_automation_hero",
    CREATE: "create_automation_hero",
  },
  ARTIFICIAL_INTELLIGENCE: {
    VIEW: "view_artificial_intelligence",
    UPDATE: "update_artificial_intelligence",
    CREATE: "create_artificial_intelligence",
  },
  BUSINESS_AUTOMATION: {
    VIEW: "view_business_automation",
    UPDATE: "update_business_automation",
    CREATE: "create_business_automation",
  },
  DATA_MANAGEMENT: {
    VIEW: "view_data_management",
    UPDATE: "update_data_management",
    CREATE: "create_data_management",
  },
  CLOUD_DEVOPS: {
    VIEW: "view_cloud_section",
    UPDATE: "update_cloud_section",
    CREATE: "create_cloud_section",
  },
  ABOUT_US_HERO: {
    VIEW: "view_about_us_hero",
    UPDATE: "update_about_us_hero",
    CREATE: "create_about_us_hero",
  },
  ABOUT_US_GROUP: {
    VIEW: "view_about_us_group",
    UPDATE: "update_about_us_group",
    CREATE: "create_about_us_group",
  },
  ABOUT_US_MISSION_VISION: {
    VIEW: "view_about_us_mission_vision",
    UPDATE: "update_about_us_mission_vision",
    CREATE: "create_about_us_mission_vision",
  },
  ABOUT_US_CORE_VALUES: {
    VIEW: "view_about_us_core_values",
    UPDATE: "update_about_us_core_values",
    CREATE: "create_about_us_core_values",
    DELETE: "delete_about_us_core_values",
  },
  ABOUT_US_JOURNEY: {
    VIEW: "view_about_us_journey",
    UPDATE: "update_about_us_journey",
    CREATE: "create_about_us_journey",
    DELETE: "delete_about_us_journey",
  },
  CYBERSECURITY_HERO: {
    VIEW: "view_cybersecurity_hero",
    UPDATE: "update_cybersecurity_hero",
    CREATE: "create_cybersecurity_hero",
  },
  NETWORK_SECTION: {
    VIEW: "view_network_section",
    UPDATE: "update_network_section",
    CREATE: "create_network_section",
  },
  CYBERSECURITY_DATA_CENTER: {
    VIEW: "view_cybersecurity_data_center",
    UPDATE: "update_cybersecurity_data_center",
    CREATE: "create_cybersecurity_data_center",
  },
  OPERATION_INTELLIGENCE: {
    VIEW: "view_operation_intelligence",
    UPDATE: "update_operation_intelligence",
    CREATE: "create_operation_intelligence",
  },
  IDENTITY_MANAGEMENT: {
    VIEW: "view_identity_management",
    UPDATE: "update_identity_management",
    CREATE: "create_identity_management",
  },
  APPLICATION_DATA: {
    VIEW: "view_application_data",
    UPDATE: "update_application_data",
    CREATE: "create_application_data",
  },
  CYBERSECURITY_NETWORK_SECTION_CARDS: {
    VIEW: "view_network_section_cards",
    UPDATE: "update_network_section_cards",
    CREATE: "create_network_section_cards",
    DELETE: "delete_network_section_cards",
  },
  CYBERSECURITY_DATA_CENTER_CARDS: {
    VIEW: "view_cybersecurity_data_center_cards",
    UPDATE: "update_cybersecurity_data_center_cards",
    CREATE: "create_cybersecurity_data_center_cards",
    DELETE: "delete_cybersecurity_data_center_cards",
  },
  CYBERSECURITY_OPERATION_INTELLIGENCE_BULLETS: {
    VIEW: "view_operation_intelligence_bullets",
    UPDATE: "update_operation_intelligence_bullets",
    CREATE: "create_operation_intelligence_bullets",
    DELETE: "delete_operation_intelligence_bullets",
  },
  CYBERSECURITY_IDENTITY_MANAGEMENT_CARDS: {
    VIEW: "view_identity_management_cards",
    UPDATE: "update_identity_management_cards",
    CREATE: "create_identity_management_cards",
    DELETE: "delete_identity_management_cards",
  },
  CYBERSECURITY_APPLICATION_DATA_BULLETS: {
    VIEW: "view_application_data_bullets",
    UPDATE: "update_application_data_bullets",
    CREATE: "create_application_data_bullets",
    DELETE: "delete_application_data_bullets",
  },
  IT_INFRASTRUCTURE_HERO: {
    VIEW: "view_it_infrastructure_hero",
    UPDATE: "update_it_infrastructure_hero",
    CREATE: "create_it_infrastructure_hero",
  },
  DATA_CENTER: {
    VIEW: "view_data_center",
    UPDATE: "update_data_center",
    CREATE: "create_data_center",
  },
  MOBILITY: {
    VIEW: "view_mobility",
    UPDATE: "update_mobility",
    CREATE: "create_mobility",
  },
  SOFTWARE_DEFINED_NETWORK: {
    VIEW: "view_software_defined_network",
    UPDATE: "update_software_defined_network",
    CREATE: "create_software_defined_network",
  },
} as const;

export function hasPermission(
  permissions: Permission[],
  permissionKey: string
): boolean {
  return permissions.some((permission) => permission === permissionKey);
}

export function hasAnyPermission(
  permissions: Permission[],
  permissionKeys: string[]
): boolean {
  return permissionKeys.some((key) => hasPermission(permissions, key));
}

export function hasResource(
  permissions: Permission[],
  resource: PermissionResource
): boolean {
  return permissions.some((permission) => permission === resource);
}

export function canAccess(
  permissions: Permission[],
  requiredPermissions?: string[]
): boolean {
  if (!requiredPermissions || requiredPermissions.length === 0) {
    return true;
  }
  return hasAnyPermission(permissions, requiredPermissions);
}

export function filterPermissionsByResource(
  permissions: Permission[],
  resource: PermissionResource
): Permission[] {
  return permissions.filter((permission) => permission === resource);
}

export function getPermissionsByRole(permissions: Permission[]): Permission[] {
  return permissions;
}

export function getGroupedPermissionsForForm() {
  return Object.entries(PERMISSION_KEYS).reduce((acc, [key, value]) => {
    const groupKey = key.charAt(0).toLowerCase() + key.slice(1).toLowerCase();
    acc[groupKey] = Object.values(value);
    return acc;
  }, {} as Record<string, string[]>);
}
