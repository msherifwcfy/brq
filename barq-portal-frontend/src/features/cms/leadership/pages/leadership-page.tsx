import DashboardLayout from "@/shared/components/layout/DashboardLayout";
import { CollapsibleCard, CollapsibleGroup } from "@/shared/components/custom/Collapsible";
import LeadershipTeamSection from "../components/leadership-team-section";
import ExecutiveTeamSection from "../components/executive-team-section";
import { useLang } from "@/shared/hooks/use-lang";

export default function LeadershipPage() {
  const { t } = useLang();

  return (
    <DashboardLayout title={t("cms.leadership.title") || "Leadership CMS"}>
      <CollapsibleGroup title={t("cms.leadership.title") || "Leadership CMS"}>
        <CollapsibleCard
          defaultOpen
          className="relative"
          title={t("cms.leadership.leadershipTeam.title") || "Leadership Team Section"}
        >
          <LeadershipTeamSection />
        </CollapsibleCard>

        <CollapsibleCard
          className="relative"
          title={t("cms.leadership.executiveTeam.title") || "Executive Team Section"}
        >
          <ExecutiveTeamSection />
        </CollapsibleCard>
      </CollapsibleGroup>
    </DashboardLayout>
  );
}

