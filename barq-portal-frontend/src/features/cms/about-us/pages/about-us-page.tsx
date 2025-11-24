import DashboardLayout from "@/shared/components/layout/DashboardLayout";
import {
  CollapsibleCard,
  CollapsibleGroup,
} from "@/shared/components/custom/Collapsible";
import { useLang } from "@/shared/hooks/use-lang";
import AboutUsHeroSectionForm from "../components/about-us-hero-form";
import AboutUsGroupSectionForm from "../components/about-us-group-form";
import AboutUsMissionVisionSectionForm from "../components/about-us-mission-vision-form";
import AboutUsCoreValuesSectionForm from "../components/about-us-core-values-form";
import AboutUsJourneySectionForm from "../components/about-us-journey-form";

export default function AboutUsPage() {
  const { t } = useLang();
  return (
    <DashboardLayout title={t("aboutUs.title")}>
      <CollapsibleGroup title={t("aboutUs.contentTitle")}>
        <CollapsibleCard
          defaultOpen
          className="relative"
          title={t("aboutUs.heroSection.title")}
        >
          <AboutUsHeroSectionForm />
        </CollapsibleCard>

        <CollapsibleCard
          className="relative"
          title={t("aboutUs.groupSection.title")}
        >
          <AboutUsGroupSectionForm />
        </CollapsibleCard>

        <CollapsibleCard
          className="relative"
          title={t("aboutUs.missionVisionSection.title")}
        >
          <AboutUsMissionVisionSectionForm />
        </CollapsibleCard>

        <CollapsibleCard
          className="relative"
          title={t("aboutUs.coreValuesSection.title")}
        >
          <AboutUsCoreValuesSectionForm />
        </CollapsibleCard>

        <CollapsibleCard
          className="relative"
          title={t("aboutUs.journeySection.title")}
        >
          <AboutUsJourneySectionForm />
        </CollapsibleCard>
      </CollapsibleGroup>
    </DashboardLayout>
  );
}
