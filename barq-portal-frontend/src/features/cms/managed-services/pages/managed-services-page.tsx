import DashboardLayout from "@/shared/components/layout/DashboardLayout";
import ManagedServicesHeroForm from "../components/managed-services-hero-form";
import ManagedServiceCardsSection from "../components/managed-service-cards-section";
import AdditionalManagedServicesOneSection from "../components/additional-managed-services-one-section";
import AdditionalManagedServicesTwoSection from "../components/additional-managed-services-two-section";
import ManagedServicesFormSubmissionsSection from "../components/managed-services-form-submissions-section";
import ManagedServicesDetailsSection from "../components/managed-services-details-section";
import { ProtectedComponent } from "@/shared/components/rbac/ProtectedComponent";
import { PERMISSION_KEYS } from "@/shared/config/permissions";
import {
  CollapsibleCard,
  CollapsibleGroup,
} from "@/shared/components/custom/Collapsible";
import { useLang } from "@/shared/hooks/use-lang";

export default function ManagedServicesPage() {
  const { t } = useLang();

  return (
    <DashboardLayout title={t("cms.managedServices.title") || "Managed Services CMS"}>
      <CollapsibleGroup title={t("cms.managedServices.title") || "Managed Services CMS"}>
        <ProtectedComponent permissionKey={PERMISSION_KEYS.HERO.VIEW}>
          <CollapsibleCard
            defaultOpen
            className="relative"
            title={t("cms.managedServices.hero.title") || "Hero Section"}
          >
            <ManagedServicesHeroForm />
          </CollapsibleCard>
        </ProtectedComponent>
        <CollapsibleCard
          className="relative"
          title={t("cms.managedServices.coreCards.title") || "Core Service Cards"}
        >
          <ManagedServiceCardsSection />
        </CollapsibleCard>
        <CollapsibleCard
          className="relative"
          title={t("cms.managedServices.additionalOne.title") || "Additional Services (NOC/SLA)"}
        >
          <AdditionalManagedServicesOneSection />
        </CollapsibleCard>
        <CollapsibleCard
          className="relative"
          title={t("cms.managedServices.additionalTwo.title") || "Additional Services (Other)"}
        >
          <AdditionalManagedServicesTwoSection />
        </CollapsibleCard>
        <CollapsibleCard
          className="relative"
          title={t("cms.managedServices.details.title") || "Services Details"}
        >
          <ManagedServicesDetailsSection />
        </CollapsibleCard>
        <CollapsibleCard
          className="relative"
          title={t("cms.managedServices.formSubmissions.title") || "Form Submissions"}
        >
          <ManagedServicesFormSubmissionsSection />
        </CollapsibleCard>
      </CollapsibleGroup>
    </DashboardLayout>
  );
}