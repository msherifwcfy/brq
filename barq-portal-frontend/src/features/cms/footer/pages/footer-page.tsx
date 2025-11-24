import DashboardLayout from "@/shared/components/layout/DashboardLayout";
import { ProtectedComponent } from "@/shared/components/rbac/ProtectedComponent";
import { PERMISSION_KEYS } from "@/shared/config/permissions";
import {
  CollapsibleCard,
  CollapsibleGroup,
} from "@/shared/components/custom/Collapsible";
import { useLang } from "@/shared/hooks/use-lang";
import FooterContactsSection from "../components/footer-contacts-section";
import FooterLocationsSection from "../components/footer-locations-section";
import FooterTermsSection from "../components/footer-terms-section";

export default function FooterPage() {
  const { t } = useLang();

  return (
    <DashboardLayout title={t("cms.footer.title")}>
      <CollapsibleGroup title={t("cms.footer.title")}>
        <ProtectedComponent
          permissionKey={PERMISSION_KEYS.FOOTER_CONTACTS.VIEW}
        >
          <CollapsibleCard
            defaultOpen
            className="relative"
            title={t("cms.footer.contacts.title")}
          >
            <FooterContactsSection />
          </CollapsibleCard>
        </ProtectedComponent>

        <ProtectedComponent
          permissionKey={PERMISSION_KEYS.FOOTER_LOCATIONS.VIEW}
        >
          <CollapsibleCard
            className="relative"
            title={t("cms.footer.locations.title")}
          >
            <FooterLocationsSection />
          </CollapsibleCard>
        </ProtectedComponent>

        <ProtectedComponent
          permissionKey={PERMISSION_KEYS.FOOTER_TERMS.VIEW}
        >
          <CollapsibleCard
            className="relative"
            title={t("cms.footer.terms.title")}
          >
            <FooterTermsSection />
          </CollapsibleCard>
        </ProtectedComponent>
      </CollapsibleGroup>
    </DashboardLayout>
  );
}
