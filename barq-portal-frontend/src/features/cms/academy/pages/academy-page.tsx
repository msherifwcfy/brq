import DashboardLayout from "@/shared/components/layout/DashboardLayout";
import {
  CollapsibleCard,
  CollapsibleGroup,
} from "@/shared/components/custom/Collapsible";
import AcademyHeroForm from "../components/academy-hero-form";
import AcademyHighlightsForm from "../components/academy-highlights-form";
import AcademyHighlightCardsSection from "../components/academy-highlight-cards-section";
import AcademyFoundationTracksSection from "../components/academy-foundation-tracks-section";
import AcademyInternshipProgramsSection from "../components/academy-internship-programs-section";

export default function AcademyPage() {
  return (
    <DashboardLayout title="Academy Content Management">
      <CollapsibleGroup title="Academy Content">
        <CollapsibleCard
          defaultOpen
          className="relative"
          title="Hero Section"
        >
          <AcademyHeroForm />
        </CollapsibleCard>

        <CollapsibleCard
          className="relative"
          title="Highlights Section"
        >
          <AcademyHighlightsForm />
        </CollapsibleCard>

        <CollapsibleCard
          className="relative"
          title="Highlight Cards"
        >
          <AcademyHighlightCardsSection />
        </CollapsibleCard>

        <CollapsibleCard
          className="relative"
          title="Foundation Tracks"
        >
          <AcademyFoundationTracksSection />
        </CollapsibleCard>

        <CollapsibleCard
          className="relative"
          title="Internship Programs"
        >
          <AcademyInternshipProgramsSection />
        </CollapsibleCard>
      </CollapsibleGroup>
    </DashboardLayout>
  );
}
