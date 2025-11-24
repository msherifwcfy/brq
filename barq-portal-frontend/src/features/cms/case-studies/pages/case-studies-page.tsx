import DashboardLayout from "@/shared/components/layout/DashboardLayout";
import { ProtectedComponent } from "@/shared/components/rbac/ProtectedComponent";
import { PERMISSION_KEYS } from "@/shared/config/permissions";
import {
  CollapsibleCard,
  CollapsibleGroup,
} from "@/shared/components/custom/Collapsible";
import { useLang } from "@/shared/hooks/use-lang";
import CaseStudiesSection from "@/features/case-studies/components/case-studies-section";
import SuccessStoryHeroSection from "../components/success-story-hero-section";

export default function CaseStudiesPage() {
  const { t } = useLang();

  return (
    <DashboardLayout title={t("cms.caseStudies.title")}>
      <CollapsibleGroup title={t("cms.caseStudies.title")}>
        <ProtectedComponent permissionKey={PERMISSION_KEYS.SUCCESS_STORY_HERO.VIEW}>
          <CollapsibleCard
            defaultOpen
            className="relative"
            title={t("cms.caseStudies.hero.title") || "Success Story Hero"}
          >
            <SuccessStoryHeroSection />
          </CollapsibleCard>
        </ProtectedComponent>

        <ProtectedComponent permissionKey={PERMISSION_KEYS.SUCCESS_STORY_CASE_STUDIES.VIEW}>
          <CollapsibleCard
            className="relative"
            title={t("caseStudies.list.title") || "Case Studies"}
          >
            <CaseStudiesSection />
          </CollapsibleCard>
        </ProtectedComponent>
      </CollapsibleGroup>
    </DashboardLayout>
  );
}

