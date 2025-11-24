import DashboardLayout from "@/shared/components/layout/DashboardLayout";
import { CollapsibleCard, CollapsibleGroup } from "@/shared/components/custom/Collapsible";
import CareerHeroForm from "../components/career-hero-form";
import CareerOpenPositionHeroForm from "../components/career-open-position-hero-form";
import CareerJobDetailSection from "../components/career-job-detail-section";
import ManageItemsSection from "../components/manage-items-section";
import OpenPositionsSection from "../components/open-positions-section";
import FormSubmissionsSection from "../components/form-submissions-section";
import CareerWorkingAtBarqSection from "../components/career-working-at-barq-section";
import { useLang } from "@/shared/hooks/use-lang";

export default function CareersPage() {
  const { t } = useLang();

  return (
    <DashboardLayout title={t("cms.careers.title") || "Careers CMS"}>
      <CollapsibleGroup title={t("cms.careers.title") || "Careers CMS"}>
        <CollapsibleCard
          defaultOpen
          className="relative"
          title={t("cms.careers.hero.title") || "Hero Section"}
        >
          <CareerHeroForm />
        </CollapsibleCard>

        <CollapsibleCard
          className="relative"
          title={t("cms.careers.openPositionHero.title") || "Open Position Hero Section"}
        >
          <CareerOpenPositionHeroForm />
        </CollapsibleCard>

        <CollapsibleCard
          className="relative"
          title={t("cms.careers.workingAtBarq.title") || "Working at Barq Section"}
        >
          <CareerWorkingAtBarqSection />
        </CollapsibleCard>

        <CollapsibleCard
          className="relative"
          title={t("cms.careers.manageItems.title") || "Manage Items"}
        >
          <ManageItemsSection />
        </CollapsibleCard>

        <CollapsibleCard
          className="relative"
          title={t("cms.careers.openPositions.title") || "Open Positions"}
        >
          <OpenPositionsSection />
        </CollapsibleCard>

        <CollapsibleCard
          className="relative"
          title={t("cms.careers.formSubmissions.title") || "Form Submissions"}
        >
          <FormSubmissionsSection />
        </CollapsibleCard>
      </CollapsibleGroup>
    </DashboardLayout>
  );
}

