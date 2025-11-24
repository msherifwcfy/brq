// home page should have all the sections

import DashboardLayout from "@/shared/components/layout/DashboardLayout";
import HomeHeroSection from "../components/home-hero-section";
import HomeWhoWeAreSection from "../components/home-who-we-are-section";
import HomeLandingNumbersSection from "../components/home-landing-numbers-section";
import HomeLeadershipSection from "../components/home-leadership-section";
import { ProtectedComponent } from "@/shared/components/rbac/ProtectedComponent";
import { PERMISSION_KEYS } from "@/shared/config/permissions";
import {
  CollapsibleCard,
  CollapsibleGroup,
  CollapsibleSection,
} from "@/shared/components/custom/Collapsible";
import { useLang } from "@/shared/hooks/use-lang";

export default function HomePage() {
  const { t } = useLang();
  return (
    <DashboardLayout title={t("dashboard.titles.dashboard")}>
      <CollapsibleGroup title={t("cms.homePage.title")}>
        <ProtectedComponent permissionKey={PERMISSION_KEYS.HERO.VIEW}>
          <CollapsibleCard
            defaultOpen
            className="relative"
            title={t("cms.homePage.hero.title")}
          >
            <HomeHeroSection />
          </CollapsibleCard>
        </ProtectedComponent>
        <ProtectedComponent
          permissionKey={PERMISSION_KEYS.LEADERSHIP?.VIEW as any}
        >
          <CollapsibleCard
            className="relative"
            title={t("cms.homePage.leadership.title")}
          >
            <HomeLeadershipSection />
          </CollapsibleCard>
        </ProtectedComponent>
        <ProtectedComponent permissionKey={PERMISSION_KEYS.WHO_ARE_WE.VIEW}>
          <CollapsibleCard
            className="relative"
            title={t("cms.homePage.whoWeAre.title")}
          >
            <HomeWhoWeAreSection />
          </CollapsibleCard>
        </ProtectedComponent>
        <ProtectedComponent
          permissionKey={PERMISSION_KEYS.LANDING_NUMBERS.VIEW}
        >
          <CollapsibleCard
            className="relative"
            title={t("cms.homePage.whoWeAreStats.title")}
          >
            <HomeLandingNumbersSection />
          </CollapsibleCard>
        </ProtectedComponent>
      </CollapsibleGroup>
    </DashboardLayout>
  );
}
