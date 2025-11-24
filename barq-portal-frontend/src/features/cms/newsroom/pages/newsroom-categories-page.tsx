import DashboardLayout from "@/shared/components/layout/DashboardLayout";
import NewsroomCategoriesSection from "../components/newsroom-categories-section";
import { useLang } from "@/shared/hooks/use-lang";

export default function NewsroomCategoriesPage() {
  const { t } = useLang();

  return (
    <DashboardLayout title={t("cms.newsroom.manageItems.categories.title") || "Newsroom Categories"}>
      <NewsroomCategoriesSection />
    </DashboardLayout>
  );
}

