import DashboardLayout from "@/shared/components/layout/DashboardLayout";
import { ProtectedComponent } from "@/shared/components/rbac/ProtectedComponent";
import { PERMISSION_KEYS } from "@/shared/config/permissions";
import {
  CollapsibleCard,
  CollapsibleGroup,
} from "@/shared/components/custom/Collapsible";
import { useLang } from "@/shared/hooks/use-lang";
import ItInfrastructureHeroSection from "../components/it-infrastructure-hero-section";
import DataCenterSection from "../components/data-center-section";
import MobilitySection from "../components/mobility-section";
import SoftwareDefinedNetworkSection from "../components/software-defined-network-section";

export default function ItInfrastructurePage() {
  const { t } = useLang();

  return (
    <DashboardLayout title={t("cms.itInfrastructure.title")}>
      <CollapsibleGroup title={t("cms.itInfrastructure.title")}>
        <ProtectedComponent
          permissionKey={PERMISSION_KEYS.IT_INFRASTRUCTURE_HERO.VIEW}
        >
          <CollapsibleCard
            defaultOpen
            className="relative"
            title={t("cms.itInfrastructure.hero.title")}
          >
            <ItInfrastructureHeroSection />
          </CollapsibleCard>
        </ProtectedComponent>

        <ProtectedComponent permissionKey={PERMISSION_KEYS.DATA_CENTER.VIEW}>
          <CollapsibleCard
            className="relative"
            title={t("cms.itInfrastructure.dataCenter.title")}
          >
            <DataCenterSection />
          </CollapsibleCard>
        </ProtectedComponent>

        <ProtectedComponent permissionKey={PERMISSION_KEYS.MOBILITY.VIEW}>
          <CollapsibleCard
            className="relative"
            title={t("cms.itInfrastructure.mobility.title")}
          >
            <MobilitySection />
          </CollapsibleCard>
        </ProtectedComponent>

        <ProtectedComponent
          permissionKey={PERMISSION_KEYS.SOFTWARE_DEFINED_NETWORK.VIEW}
        >
          <CollapsibleCard
            className="relative"
            title={t("cms.itInfrastructure.softwareDefinedNetwork.title")}
          >
            <SoftwareDefinedNetworkSection />
          </CollapsibleCard>
        </ProtectedComponent>
      </CollapsibleGroup>
    </DashboardLayout>
  );
}
