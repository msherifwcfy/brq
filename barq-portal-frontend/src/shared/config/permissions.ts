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
  FOOTER_TERMS: {
    VIEW: "view_footer_terms",
    UPDATE: "update_footer_terms",
    CREATE: "create_footer_terms",
    DELETE: "delete_footer_terms",
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
  CONTROL_SECTION: {
    VIEW: "view_control_section",
    UPDATE: "update_control_section",
    CREATE: "create_control_section",
  },
  CONTACT_US_REQUEST_TYPES: {
    VIEW: "view_contact_us_request_type",
    UPDATE: "update_contact_us_request_type",
    CREATE: "create_contact_us_request_type",
    DELETE: "delete_contact_us_request_type",
  },
  CONTACT_US_HEAR_ABOUT_OPTIONS: {
    VIEW: "view_contact_us_hear_about_drop",
    UPDATE: "update_contact_us_hear_about_drop",
    CREATE: "create_contact_us_hear_about_drop",
    DELETE: "delete_contact_us_hear_about_drop",
  },
  ECOSYSTEM_SUSTAINABILITY: {
    VIEW: "view_ecosystem_sustainability",
    UPDATE: "update_ecosystem_sustainability",
    CREATE: "create_ecosystem_sustainability",
  },
  GLOBAL_COMMITMENT: {
    VIEW: "view_global_commitment",
    UPDATE: "update_global_commitment",
    CREATE: "create_global_commitment",
  },
  ECONOMIC_SUSTAINABILITY: {
    VIEW: "view_economic_sustainability",
    UPDATE: "update_economic_sustainability",
    CREATE: "create_economic_sustainability",
  },
  MAIN_SOCIAL: {
    VIEW: "view_main_social",
    UPDATE: "update_main_social",
    CREATE: "create_main_social",
  },
  ENVIRONMENTAL_SUSTAINABILITY: {
    VIEW: "view_environmental_sustainability",
    UPDATE: "update_environmental_sustainability",
    CREATE: "create_environmental_sustainability",
  },
  ABOUT_BARQ_HERO: {
    VIEW: "view_about_barq_hero",
    UPDATE: "update_about_barq_hero",
    CREATE: "create_about_barq_hero",
  },
  ABOUT_BARQ_GROUP_AFFILIATION: {
    VIEW: "view_about_barq_group_affiliation",
    UPDATE: "update_about_barq_group_affiliation",
    CREATE: "create_about_barq_group_affiliation",
  },
  ABOUT_BARQ_MISSION_VISION: {
    VIEW: "view_about_barq_mission_vision",
    UPDATE: "update_about_barq_mission_vision",
    CREATE: "create_about_barq_mission_vision",
    DELETE: "delete_about_barq_mission_vision",
  },
  ABOUT_BARQ_CORE_VALUES: {
    VIEW: "view_about_barq_core_values",
    UPDATE: "update_about_barq_core_values",
    CREATE: "create_about_barq_core_values",
  },
  ABOUT_BARQ_MILESTONES: {
    VIEW: "view_about_barq_milestones",
    UPDATE: "update_about_barq_milestones",
    CREATE: "create_about_barq_milestones",
    DELETE: "delete_about_barq_milestones",
  },
  CONTACT_US_HERO: {
    VIEW: "view_contact_us_hero",
    UPDATE: "update_contact_us_hero",
    CREATE: "create_contact_us_hero",
  },
  CONTACT_US_OFFICES: {
    VIEW: "view_contact_us_offices",
    UPDATE: "update_contact_us_offices",
    CREATE: "create_contact_us_offices",
  },
  CONTACT_US: {
    VIEW: "view_contact_us",
    UPDATE: "update_contact_us",
    CREATE: "create_contact_us",
    DELETE: "delete_contact_us",
  },
  MANAGED_SERVICE_HERO: {
    VIEW: "view_managed_service_hero",
    UPDATE: "update_managed_service_hero",
    CREATE: "create_managed_service_hero",
  },
  CORE_MANAGED_SERVICES: {
    VIEW: "view_core_managed_services",
    UPDATE: "update_core_managed_services",
    CREATE: "create_core_managed_services",
  },
  MANAGED_SOC_SERVICES_DETAILS: {
    VIEW: "view_managed_soc_services_details",
    UPDATE: "update_managed_soc_services_details",
    CREATE: "create_managed_soc_services_details",
  },
  MANAGED_GRC_SERVICES_DETAILS: {
    VIEW: "view_managed_grc_services_details",
    UPDATE: "update_managed_grc_services_details",
    CREATE: "create_managed_grc_services_details",
    DELETE: "delete_managed_grc_services_details",
  },
  CAREER_OPPORTUNITY: {
    DELETE: "delete_career_opportunity",
    VIEW: "view_career_opportunity",
    UPDATE: "update_career_opportunity",
    CREATE: "create_career_opportunity",
  },
  CAREER_CATEGORY: {
    DELETE: "delete_career_category",
    VIEW: "view_career_category",
    UPDATE: "update_career_category",
    CREATE: "create_career_category",
  },
  CAREER_HERO: {
    VIEW: "view_career_hero",
    UPDATE: "update_career_hero",
    CREATE: "create_career_hero",
  },
  CAREER_WORKING_AT_BARQ: {
    VIEW: "view_career_working_at_barq",
    UPDATE: "update_career_working_at_barq",
    CREATE: "create_career_working_at_barq",
  },
  CITY: {
    VIEW: "view_city",
    UPDATE: "update_city",
    CREATE: "create_city",
    DELETE: "delete_city",
  },
  CAREER_OPEN_POSITION: {
    DELETE: "delete_career_open_position",
    VIEW: "view_career_open_position",
    UPDATE: "update_career_open_position",
    CREATE: "create_career_open_position",
  },
  CAREER_OPEN_POSITION_HERO: {
    VIEW: "view_career_open_position_hero",
    UPDATE: "update_career_open_position_hero",
    CREATE: "create_career_open_position_hero",
  },
  CAREER_JOB_DETAIL: {
    VIEW: "view_career_job_detail",
    UPDATE: "update_career_job_detail",
    CREATE: "create_career_job_detail",
  },
  CAREER_APPLICATION_FORM: {
    VIEW: "view_career_application_form",
    UPDATE: "update_career_application_form",
    CREATE: "create_career_application_form",
  },
  MANAGED_SERVICE_DOWNLOAD_FORM: {
    VIEW: "view_managed_service_download_form",
    UPDATE: "update_managed_service_download_form",
    CREATE: "create_managed_service_download_form",
    DELETE: "delete_managed_service_download_form",
  },
  RESOURCE_HERO: {
    VIEW: "view_resource_hero",
    UPDATE: "update_resource_hero",
    CREATE: "create_resource_hero",
  },
  RESOURCE_CARDS: {
    VIEW: "view_resource_cards",
    UPDATE: "update_resource_cards",
    CREATE: "create_resource_cards",
    DELETE: "delete_resource_cards",
  },
  ADDITIONAL_MANAGED_SERVICES_ONE: {
    VIEW: "view_additional_managed_services_one",
    UPDATE: "update_additional_managed_services_one",
    CREATE: "create_additional_managed_services_one",
    DELETE: "delete_additional_managed_services_one",
  },
  LEADERSHIP_EXECUTIVE_TEAM: {
    VIEW: "view_leadership_executive_team",
    UPDATE: "update_leadership_executive_team",
    CREATE: "create_leadership_executive_team",
    DELETE: "delete_leadership_executive_team",
  },
  LEADERSHIP_TEAM: {
    VIEW: "view_leadership_team",
    UPDATE: "update_leadership_team",
    CREATE: "create_leadership_team",
  },
  MANAGED_SERVICE_CARDS: {
    VIEW: "view_managed_service_cards",
    UPDATE: "update_managed_service_cards",
    CREATE: "create_managed_service_cards",
    DELETE: "delete_managed_service_cards",
  },
  HOME_AWARDS: {
    VIEW: "view_home_awards",
    UPDATE: "update_home_awards",
    CREATE: "create_home_awards",
  },
  BARQ_ACADEMY_HERO: {
    VIEW: "view_barq_academy_hero",
    UPDATE: "update_barq_academy_hero",
    CREATE: "create_barq_academy_hero",
  },
  BARQ_ACADEMY_HIGHLIGHTS: {
    VIEW: "view_barq_academy_highlights",
    UPDATE: "update_barq_academy_highlights",
    CREATE: "create_barq_academy_highlights",
  },
  BARQ_ACADEMY_PROGRAMS_OPPORTUNITIES: {
    VIEW: "view_barq_academy_programs_opportunities",
    UPDATE: "update_barq_academy_programs_opportunities",
    CREATE: "create_barq_academy_programs_opportunities",
  },
  BARQ_ACADEMY_FOUNDATION_TRACKS_FORM_DATA: {
    VIEW: "view_barq_academy_foundation_tracks_form_data",
    UPDATE: "update_barq_academy_foundation_tracks_form_data",
    CREATE: "create_barq_academy_foundation_tracks_form_data",
  },
  BARQ_ACADEMY_FOUNDATION_TRACKS_FORM: {
    VIEW: "view_barq_academy_foundation_tracks_form",
    UPDATE: "update_barq_academy_foundation_tracks_form",
    CREATE: "create_barq_academy_foundation_tracks_form",
  },
  BARQ_ACADEMY_PROGRAMS_OPPORTUNITIES_INTERNSHIP: {
    VIEW: "view_barq_academy_programs_opportunities_internship",
    UPDATE: "update_barq_academy_programs_opportunities_internship",
    CREATE: "create_barq_academy_programs_opportunities_internship",
  },
  BARQ_ACADEMY_FOUNDATION_INTERNSHIP_FORM_DATA: {
    VIEW: "view_barq_academy_foundation_internship_form_data",
    UPDATE: "update_barq_academy_foundation_internship_form_data",
    CREATE: "create_barq_academy_foundation_internship_form_data",
  },
  BARQ_ACADEMY_FOUNDATION_INTERNSHIP_FORM: {
    VIEW: "view_barq_academy_foundation_internship_form",
    UPDATE: "update_barq_academy_foundation_internship_form",
    CREATE: "create_barq_academy_foundation_internship_form",
  },
  SOLUTIONS_AND_SERVICES_HERO: {
    VIEW: "view_solutions_and_services_hero",
    UPDATE: "update_solutions_and_services_hero",
    CREATE: "create_solutions_and_services_hero",
  },
  SUCCESS_STORY_HERO: {
    VIEW: "view_success_story_hero",
    UPDATE: "update_success_story_hero",
    CREATE: "create_success_story_hero",
  },
  SUCCESS_STORY_CASE_STUDIES: {
    VIEW: "view_success_story_case_studies",
    UPDATE: "update_success_story_case_studies",
    CREATE: "create_success_story_case_studies",
    DELETE: "delete_success_story_case_studies",
  },
  NEWSROOM_HERO: {
    VIEW: "view_newsroom_hero",
    UPDATE: "update_newsroom_hero",
    CREATE: "create_newsroom_hero",
  },
  NEWSROOM_CATEGORY: {
    VIEW: "view_newsroom_category",
    UPDATE: "update_newsroom_category",
    CREATE: "create_newsroom_category",
  },
  NEWSROOM_CARDS: {
    VIEW: "view_newsroom_cards",
    UPDATE: "update_newsroom_cards",
    CREATE: "create_newsroom_cards",
    DELETE: "delete_newsroom_cards",
  },
  EVENTS: {
    VIEW: "view_event_joinus_form",
  },
  EVENTS_PARTNERS: {
    VIEW: "view_events_partner",
    UPDATE: "update_events_partner",
    CREATE: "create_events_partner",
  },
  EVENTS_SPEAKERS: {
    VIEW: "view_events_speakers",
    UPDATE: "update_events_speakers",
    CREATE: "create_events_speakers",
  },
  EVENTS_HERO: {
    VIEW: "view_event_join_us_hero",
    UPDATE: "update_event_join_us_hero",
    CREATE: "create_event_join_us_hero",
  },
  EVENTS_REGISTRATIONS: {
    VIEW: "view_event_joinus_form",
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
