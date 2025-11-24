import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import CareerOpportunitiesSection from "./career-opportunities-section";
import CareerCategoriesSection from "./career-categories-section";
import { useLang } from "@/shared/hooks/use-lang";

export default function ManageItemsSection() {
  const { t } = useLang();

  return (
    <Tabs defaultValue="opportunities" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="opportunities">
          {t("cms.careers.manageItems.opportunitiesLabel")}
        </TabsTrigger>
        <TabsTrigger value="categories">
          {t("cms.careers.manageItems.categoriesLabel")}
        </TabsTrigger>
      </TabsList>
      <TabsContent value="opportunities">
        <CareerOpportunitiesSection />
      </TabsContent>
      <TabsContent value="categories">
        <CareerCategoriesSection />
      </TabsContent>
    </Tabs>
  );
}

