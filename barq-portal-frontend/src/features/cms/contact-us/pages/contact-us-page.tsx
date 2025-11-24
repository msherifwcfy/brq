import { CollapsibleCard, CollapsibleGroup } from "@/shared/components/custom/Collapsible";
import DashboardLayout from "@/shared/components/layout/DashboardLayout";
import ContactUsHeroSection from "../components/contact-us-hero-section";
import ContactUsSubmissionsSection from "../components/contact-us-submissions-section";
import ContactUsOfficesSection from "../components/contact-us-offices-section";

export default function ContactUsPage() {
  return (
    <DashboardLayout>
      <CollapsibleGroup title="Contact Us">
        <CollapsibleCard defaultOpen className="relative" title="Hero">
          <ContactUsHeroSection />
        </CollapsibleCard>
        <CollapsibleCard className="relative" title="Form Submissions">
          <ContactUsSubmissionsSection />
        </CollapsibleCard>
        <CollapsibleCard className="relative" title="Our Offices">
          <ContactUsOfficesSection />
        </CollapsibleCard>
      </CollapsibleGroup>
    </DashboardLayout>
  );
}


