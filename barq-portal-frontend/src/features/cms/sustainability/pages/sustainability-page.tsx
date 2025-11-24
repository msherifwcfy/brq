import DashboardLayout from "@/shared/components/layout/DashboardLayout";
import { ProtectedComponent } from "@/shared/components/rbac/ProtectedComponent";
import { PERMISSION_KEYS } from "@/shared/config/permissions";
import {
  CollapsibleCard,
  CollapsibleGroup,
} from "@/shared/components/custom/Collapsible";
import { useLang } from "@/shared/hooks/use-lang";
import SustainabilityEconomicSection from "../components/sustainability-economic-section";
import SustainabilityEcosystemSection from "../components/sustainability-ecosystem-section";
import SustainabilityEnvironmentalSection from "../components/sustainability-environmental-section";
import SustainabilityGlobalCommitmentSection from "../components/sustainability-global-commitment-section";
import SustainabilityMainSocialSection from "../components/sustainability-main-social-section";
import SustainabilityCardSocialSection from "../components/sustainability-card-social-section";

export default function SustainabilityPage() {
  const { t } = useLang();

  return (
    <DashboardLayout title={t("cms.sustainability.title")}>
      <CollapsibleGroup title={t("cms.sustainability.title")}>
        <ProtectedComponent permissionKey={PERMISSION_KEYS.HERO.VIEW}>
          <CollapsibleCard
            defaultOpen
            className="relative"
            title={t("cms.sustainability.economic.title")}
          >
            <SustainabilityEconomicSection />
          </CollapsibleCard>
        </ProtectedComponent>

        <ProtectedComponent permissionKey={PERMISSION_KEYS.HERO.VIEW}>
          <CollapsibleCard
            className="relative"
            title={t("cms.sustainability.ecosystem.title")}
          >
            <SustainabilityEcosystemSection />
          </CollapsibleCard>
        </ProtectedComponent>

        <ProtectedComponent permissionKey={PERMISSION_KEYS.HERO.VIEW}>
          <CollapsibleCard
            className="relative"
            title={t("cms.sustainability.environmental.title")}
          >
            <SustainabilityEnvironmentalSection />
          </CollapsibleCard>
        </ProtectedComponent>

        <ProtectedComponent permissionKey={PERMISSION_KEYS.HERO.VIEW}>
          <CollapsibleCard
            className="relative"
            title={t("cms.sustainability.globalCommitment.title")}
          >
            <SustainabilityGlobalCommitmentSection />
          </CollapsibleCard>
        </ProtectedComponent>

        <ProtectedComponent permissionKey={PERMISSION_KEYS.HERO.VIEW}>
          <CollapsibleCard
            className="relative"
            title={t("cms.sustainability.mainSocial.title")}
          >
            <SustainabilityMainSocialSection />
          </CollapsibleCard>
        </ProtectedComponent>

        <ProtectedComponent permissionKey={PERMISSION_KEYS.HERO.VIEW}>
          <CollapsibleCard
            className="relative"
            title={t("cms.sustainability.cardSocial.title")}
          >
            <SustainabilityCardSocialSection />
          </CollapsibleCard>
        </ProtectedComponent>
      </CollapsibleGroup>
    </DashboardLayout>
  );
}
