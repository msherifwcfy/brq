import DashboardLayout from "@/shared/components/layout/DashboardLayout";
import SolutionsAndServicesHeroForm from "../components/solutions-and-services-hero-form";
import { ProtectedComponent } from "@/shared/components/rbac/ProtectedComponent";
import { PERMISSION_KEYS } from "@/shared/config/permissions";
import {
  CollapsibleCard,
  CollapsibleGroup,
} from "@/shared/components/custom/Collapsible";
import { useLang } from "@/shared/hooks/use-lang";

export default function SolutionsAndServicesPage() {
  const { t } = useLang();

  return (
    <DashboardLayout
      title={
        t("cms.solutionsAndServices.title") || "Solutions & Services CMS"
      }
    >
      <CollapsibleGroup
        title={
          t("cms.solutionsAndServices.title") || "Solutions & Services CMS"
        }
      >
        <ProtectedComponent permissionKey={PERMISSION_KEYS.HERO.VIEW}>
          <CollapsibleCard
            defaultOpen
            className="relative"
            title={
              t("cms.solutionsAndServices.hero.title") || "Hero Section"
            }
          >
            <SolutionsAndServicesHeroForm />
          </CollapsibleCard>
        </ProtectedComponent>
      </CollapsibleGroup>
    </DashboardLayout>
  );
}

