import DashboardLayout from "@/shared/components/layout/DashboardLayout";
import { ProtectedComponent } from "@/shared/components/rbac/ProtectedComponent";
import { PERMISSION_KEYS } from "@/shared/config/permissions";
import {
  CollapsibleCard,
  CollapsibleGroup,
} from "@/shared/components/custom/Collapsible";
import { useLang } from "@/shared/hooks/use-lang";
import EventsHeroSection from "../components/events-hero-section.tsx";
import EventsListSection from "../components/events-list-section.tsx";
import EventsPartnersSection from "../components/events-partners-section.tsx";
import EventsSpeakersSection from "../components/events-speakers-section.tsx";
import EventsRegistrationsSection from "../components/events-registrations-section.tsx";

export default function EventsCMSPage() {
  const { t } = useLang();

  return (
    <DashboardLayout title={t("cms.events.title")}>
      <CollapsibleGroup title={t("cms.events.title")}>
        <ProtectedComponent permissionKey={PERMISSION_KEYS.EVENTS_HERO.VIEW}>
          <CollapsibleCard
            defaultOpen
            className="relative"
            title={t("cms.events.hero.title")}
          >
            <EventsHeroSection />
          </CollapsibleCard>
        </ProtectedComponent>

        <ProtectedComponent permissionKey={PERMISSION_KEYS.EVENTS.VIEW}>
          <CollapsibleCard
            className="relative"
            title={t("cms.events.list.title")}
          >
            <EventsListSection />
          </CollapsibleCard>
        </ProtectedComponent>

        <ProtectedComponent
          permissionKey={PERMISSION_KEYS.EVENTS_SPEAKERS.VIEW}
        >
          <CollapsibleCard
            className="relative"
            title={t("cms.events.speakers.title")}
          >
            <EventsSpeakersSection />
          </CollapsibleCard>
        </ProtectedComponent>

        <ProtectedComponent
          permissionKey={PERMISSION_KEYS.EVENTS_PARTNERS.VIEW}
        >
          <CollapsibleCard
            className="relative"
            title={t("cms.events.partners.title")}
          >
            <EventsPartnersSection />
          </CollapsibleCard>
        </ProtectedComponent>

        <ProtectedComponent
          permissionKey={PERMISSION_KEYS.EVENTS_REGISTRATIONS.VIEW}
        >
          <CollapsibleCard
            className="relative"
            title={t("cms.events.registrations.title")}
          >
            <EventsRegistrationsSection />
          </CollapsibleCard>
        </ProtectedComponent>
      </CollapsibleGroup>
    </DashboardLayout>
  );
}

