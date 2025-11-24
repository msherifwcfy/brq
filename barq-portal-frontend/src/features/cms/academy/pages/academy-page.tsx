import DashboardLayout from "@/shared/components/layout/DashboardLayout";
import {
  CollapsibleCard,
  CollapsibleGroup,
} from "@/shared/components/custom/Collapsible";
import { useLang } from "@/shared/hooks/use-lang";
import AcademyHeroForm from "../components/academy-hero-form";
import AcademyHighlightsForm from "../components/academy-highlights-form";
import AcademyHighlightCardsSection from "../components/academy-highlight-cards-section";
import AcademyFoundationTracksSection from "../components/academy-foundation-tracks-section";
import AcademyFoundationTrackSubmissionsSection from "../components/academy-foundation-track-submissions-section";
import AcademyInternshipProgramsSection from "../components/academy-internship-programs-section";
import AcademyInternshipSubmissionsSection from "../components/academy-internship-submissions-section";

export default function AcademyPage() {
  const { t } = useLang();

  return (
    <DashboardLayout title={t("cms.academy.title")}>
      <CollapsibleGroup title={t("cms.academy.contentTitle")}>
        <CollapsibleCard
          defaultOpen
          className="relative"
          title={t("cms.academy.hero.title")}
        >
          <AcademyHeroForm />
        </CollapsibleCard>

        <CollapsibleCard
          className="relative"
          title={t("cms.academy.highlights.title")}
        >
          <AcademyHighlightsForm />
        </CollapsibleCard>


        <CollapsibleCard
          className="relative"
          title={t("cms.academy.foundationTracks.title")}
        >
          <AcademyFoundationTracksSection />
        </CollapsibleCard>

        <CollapsibleCard
          className="relative"
          title={t("cms.academy.foundationTrackSubmissions.title")}
        >
          <AcademyFoundationTrackSubmissionsSection />
        </CollapsibleCard>

        <CollapsibleCard
          className="relative"
          title={t("cms.academy.internshipSubmissions.title")}
        >
          <AcademyInternshipSubmissionsSection />
        </CollapsibleCard>

        <CollapsibleCard
          className="relative"
          title={t("cms.academy.internshipPrograms.title")}
        >
          <AcademyInternshipProgramsSection />
        </CollapsibleCard>
      </CollapsibleGroup>
    </DashboardLayout>
  );
}
