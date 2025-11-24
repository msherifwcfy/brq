import DashboardLayout from "@/shared/components/layout/DashboardLayout";
import { CollapsibleCard, CollapsibleGroup } from "@/shared/components/custom/Collapsible";
import NewsroomHeroForm from "../components/newsroom-hero-form";
import NewsroomArticlesSection from "../components/newsroom-articles-section";
import { useLang } from "@/shared/hooks/use-lang";

export default function NewsroomCMSPage() {
  const { t } = useLang();

  return (
    <DashboardLayout title={t("cms.newsroom.title")}>
      <CollapsibleGroup title={t("cms.newsroom.contentTitle")}>
        <CollapsibleCard defaultOpen className="relative" title={t("cms.newsroom.hero.title")}>
          <NewsroomHeroForm />
        </CollapsibleCard>
        <CollapsibleCard className="relative" title={t("cms.newsroom.articles.title")}>
          <NewsroomArticlesSection />
        </CollapsibleCard>
      </CollapsibleGroup>
    </DashboardLayout>
  );
}


