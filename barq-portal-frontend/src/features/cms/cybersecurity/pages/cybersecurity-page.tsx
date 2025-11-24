import DashboardLayout from "@/shared/components/layout/DashboardLayout";
import { ProtectedComponent } from "@/shared/components/rbac/ProtectedComponent";
import { PERMISSION_KEYS } from "@/shared/config/permissions";
import {
  CollapsibleCard,
  CollapsibleGroup,
} from "@/shared/components/custom/Collapsible";
import { useLang } from "@/shared/hooks/use-lang";
import CybersecurityHeroSection from "../components/cybersecurity-hero-section";
import NetworkSection from "../components/network-section";
import CybersecurityDataCenterSection from "../components/cybersecurity-data-center-section";
import OperationIntelligenceSection from "../components/operation-intelligence-section";
import IdentityManagementSection from "../components/identity-management-section";
import ApplicationDataSection from "../components/application-data-section";

export default function CybersecurityPage() {
  const { t } = useLang();

  return (
    <DashboardLayout title={t("cms.cybersecurity.title")}>
      <CollapsibleGroup title={t("cms.cybersecurity.title")}>
        <ProtectedComponent
          permissionKey={PERMISSION_KEYS.CYBERSECURITY_HERO.VIEW}
        >
          <CollapsibleCard
            defaultOpen
            className="relative"
            title={t("cms.cybersecurity.hero.title")}
          >
            <CybersecurityHeroSection />
          </CollapsibleCard>
        </ProtectedComponent>

        <ProtectedComponent
          permissionKey={PERMISSION_KEYS.NETWORK_SECTION.VIEW}
        >
          <CollapsibleCard
            className="relative"
            title={t("cms.cybersecurity.networkSection.title")}
          >
            <NetworkSection />
          </CollapsibleCard>
        </ProtectedComponent>

        <ProtectedComponent
          permissionKey={PERMISSION_KEYS.CYBERSECURITY_DATA_CENTER.VIEW}
        >
          <CollapsibleCard
            className="relative"
            title={t("cms.cybersecurity.dataCenter.title")}
          >
            <CybersecurityDataCenterSection />
          </CollapsibleCard>
        </ProtectedComponent>

        <ProtectedComponent
          permissionKey={PERMISSION_KEYS.OPERATION_INTELLIGENCE.VIEW}
        >
          <CollapsibleCard
            className="relative"
            title={t("cms.cybersecurity.operationIntelligence.title")}
          >
            <OperationIntelligenceSection />
          </CollapsibleCard>
        </ProtectedComponent>

        <ProtectedComponent
          permissionKey={PERMISSION_KEYS.IDENTITY_MANAGEMENT.VIEW}
        >
          <CollapsibleCard
            className="relative"
            title={t("cms.cybersecurity.identityManagement.title")}
          >
            <IdentityManagementSection />
          </CollapsibleCard>
        </ProtectedComponent>

        <ProtectedComponent
        // permissionKey={PERMISSION_KEYS.APPLICATION_DATA.VIEW}
        >
          <CollapsibleCard
            className="relative"
            title={t("cms.cybersecurity.applicationData.title")}
          >
            <ApplicationDataSection />
          </CollapsibleCard>
        </ProtectedComponent>
      </CollapsibleGroup>
    </DashboardLayout>
  );
}
