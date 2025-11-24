import DashboardLayout from "@/shared/components/layout/DashboardLayout";
import { ProtectedComponent } from "@/shared/components/rbac/ProtectedComponent";
import { PERMISSION_KEYS } from "@/shared/config/permissions";
import {
  CollapsibleCard,
  CollapsibleGroup,
} from "@/shared/components/custom/Collapsible";
import { useLang } from "@/shared/hooks/use-lang";
import AlliancesHeadSection from "../components/alliances-head-section";
import AlliancesClientsSection from "../components/alliances-clients-section";
import AlliancesVendorsSection from "../components/alliances-vendors-section";

export default function AlliancesPage() {
  const { t } = useLang();

  return (
    <DashboardLayout title={t("cms.alliances.title")}>
      <CollapsibleGroup title={t("cms.alliances.title")}>
        <ProtectedComponent permissionKey={PERMISSION_KEYS.ALLIANCES_HEAD.VIEW}>
          <CollapsibleCard
            defaultOpen
            className="relative"
            title={t("cms.alliances.head.title")}
          >
            <AlliancesHeadSection />
          </CollapsibleCard>
        </ProtectedComponent>

        <ProtectedComponent
          permissionKey={PERMISSION_KEYS.ALLIANCES_CLIENTS.VIEW}
        >
          <CollapsibleCard
            className="relative"
            title={t("cms.alliances.clients.title")}
          >
            <AlliancesClientsSection />
          </CollapsibleCard>
        </ProtectedComponent>

        <ProtectedComponent
          permissionKey={PERMISSION_KEYS.ALLIANCES_VENDORS.VIEW}
        >
          <CollapsibleCard
            className="relative"
            title={t("cms.alliances.vendors.title")}
          >
            <AlliancesVendorsSection />
          </CollapsibleCard>
        </ProtectedComponent>
      </CollapsibleGroup>
    </DashboardLayout>
  );
}
