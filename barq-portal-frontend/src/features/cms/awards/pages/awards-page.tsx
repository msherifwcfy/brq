import DashboardLayout from "@/shared/components/layout/DashboardLayout";
import { ProtectedComponent } from "@/shared/components/rbac/ProtectedComponent";
import { PERMISSION_KEYS } from "@/shared/config/permissions";
import {
  CollapsibleCard,
  CollapsibleGroup,
} from "@/shared/components/custom/Collapsible";
import { useLang } from "@/shared/hooks/use-lang";
import AwardsHeadSection from "../components/awards-head-section";
import AwardsCardsSection from "../components/awards-cards-section";

export default function AwardsPage() {
  const { t } = useLang();

  return (
    <DashboardLayout title={t("cms.awards.title")}>
      <CollapsibleGroup title={t("cms.awards.title")}>
        <ProtectedComponent permissionKey={PERMISSION_KEYS.AWARDS_HEAD.VIEW}>
          <CollapsibleCard
            defaultOpen
            className="relative"
            title={t("cms.awards.head.title")}
          >
            <AwardsHeadSection />
          </CollapsibleCard>
        </ProtectedComponent>

        <ProtectedComponent permissionKey={PERMISSION_KEYS.AWARDS_CARDS.VIEW}>
          <CollapsibleCard
            className="relative"
            title={t("cms.awards.cards.title")}
          >
            <AwardsCardsSection />
          </CollapsibleCard>
        </ProtectedComponent>
      </CollapsibleGroup>
    </DashboardLayout>
  );
}
