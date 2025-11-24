import { CollapsibleCard, CollapsibleGroup } from "@/shared/components/custom/Collapsible";
import DashboardLayout from "@/shared/components/layout/DashboardLayout";
import ContactUsFormSection from "../components/contact-us-form-section";
import ContactUsOfficesSection from "../components/contact-us-offices-section";

export default function ContactUsPage() {
  return (
    <DashboardLayout>
      <CollapsibleGroup title="Contact Us">
        <CollapsibleCard defaultOpen className="relative" title="Contact Form">
          <ContactUsFormSection />
        </CollapsibleCard>
        <CollapsibleCard className="relative" title="Our Offices">
          <ContactUsOfficesSection />
        </CollapsibleCard>
      </CollapsibleGroup>
    </DashboardLayout>
  );
}


