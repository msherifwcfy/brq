import DashboardLayout from "@/shared/components/layout/DashboardLayout";
import { ProtectedComponent } from "@/shared/components/rbac/ProtectedComponent";
import { PERMISSION_KEYS } from "@/shared/config/permissions";
import {
  CollapsibleCard,
  CollapsibleGroup,
} from "@/shared/components/custom/Collapsible";
import { useLang } from "@/shared/hooks/use-lang";
import AutomationHeroSection from "../components/automation-hero-section";
import AutomationAISection from "../components/automation-ai-section";
import AutomationBusinessSection from "../components/automation-business-section";
import AutomationDataManagementSection from "../components/automation-data-management-section";
import AutomationCloudDevOpsSection from "../components/automation-cloud-devops-section";

export default function AutomationPage() {
  const { t } = useLang();

  return (
    <DashboardLayout title={t("cms.automation.title")}>
      <CollapsibleGroup title={t("cms.automation.title")}>
        <ProtectedComponent
          permissionKey={PERMISSION_KEYS.AUTOMATION_HERO.VIEW}
        >
          <CollapsibleCard
            defaultOpen
            className="relative"
            title={t("cms.automation.hero.title")}
          >
            <AutomationHeroSection />
          </CollapsibleCard>
        </ProtectedComponent>

        <ProtectedComponent
          permissionKey={PERMISSION_KEYS.ARTIFICIAL_INTELLIGENCE.VIEW}
        >
          <CollapsibleCard
            className="relative"
            title={t("cms.automation.ai.title")}
          >
            <AutomationAISection />
          </CollapsibleCard>
        </ProtectedComponent>

        <ProtectedComponent
          permissionKey={PERMISSION_KEYS.BUSINESS_AUTOMATION.VIEW}
        >
          <CollapsibleCard
            className="relative"
            title={t("cms.automation.business.title")}
          >
            <AutomationBusinessSection />
          </CollapsibleCard>
        </ProtectedComponent>

        <ProtectedComponent
          permissionKey={PERMISSION_KEYS.DATA_MANAGEMENT.VIEW}
        >
          <CollapsibleCard
            className="relative"
            title={t("cms.automation.dataManagement.title")}
          >
            <AutomationDataManagementSection />
          </CollapsibleCard>
        </ProtectedComponent>

        <ProtectedComponent permissionKey={PERMISSION_KEYS.CLOUD_DEVOPS.VIEW}>
          <CollapsibleCard
            className="relative"
            title={t("cms.automation.cloudDevOps.title")}
          >
            <AutomationCloudDevOpsSection />
          </CollapsibleCard>
        </ProtectedComponent>
      </CollapsibleGroup>
    </DashboardLayout>
  );
}
