import DashboardLayout from "@/shared/components/layout/DashboardLayout";
import HomeHeroSection from "../components/home-hero-section";
import HomeWhoWeAreSection from "../components/home-who-we-are-section";
import HomeLandingNumbersSection from "../components/home-landing-numbers-section";
import HomeLeadershipSection from "../components/home-leadership-section";
import HomeAwardsSection from "../components/home-awards-section";
import { ProtectedComponent } from "@/shared/components/rbac/ProtectedComponent";
import { PERMISSION_KEYS } from "@/shared/config/permissions";
import {
  CollapsibleCard,
  CollapsibleGroup,
} from "@/shared/components/custom/Collapsible";
import { useLang } from "@/shared/hooks/use-lang";
import HomeSuccessStoriesImages from "../components/home-success-stories-images";
import HomeInsightsAndNewsImages from "../components/home-insights-and-news-images";

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

        <ProtectedComponent permissionKey={PERMISSION_KEYS.HERO.VIEW}>
          <CollapsibleCard
            className="relative"
            title={t("cms.homePage.success_stories_images.title")}
          >
            <HomeSuccessStoriesImages />
          </CollapsibleCard>
        </ProtectedComponent>

        <ProtectedComponent permissionKey={PERMISSION_KEYS.HERO.VIEW}>
          <CollapsibleCard
            className="relative"
            title={t("cms.homePage.insights_and_news_images.title")}
          >
            <HomeInsightsAndNewsImages />
          </CollapsibleCard>
        </ProtectedComponent>

        <ProtectedComponent
          permissionKey={PERMISSION_KEYS.LEADERSHIP_EXECUTIVE_TEAM.VIEW}
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
        <ProtectedComponent permissionKey={PERMISSION_KEYS.HOME_AWARDS.VIEW}>
          <CollapsibleCard
            className="relative"
            title={t("cms.homePage.homeAwards.title")}
          >
            <HomeAwardsSection />
          </CollapsibleCard>
        </ProtectedComponent>
      </CollapsibleGroup>
    </DashboardLayout>
  );
}
