import { CollapsibleCard, CollapsibleGroup } from "@/shared/components/custom/Collapsible";
import DashboardLayout from "@/shared/components/layout/DashboardLayout";
import ResourcesHeroSection from "../components/resources-hero-section";
import ResourcesListingSection from "../components/resources-listing-section";

export default function ResourcesCMSPage() {
  return (
    <DashboardLayout>
     

          <CollapsibleGroup title="Resources">
            <CollapsibleCard defaultOpen className="relative" title="Hero">
              <ResourcesHeroSection />
            </CollapsibleCard>
            <CollapsibleCard className="relative" title="Resources List">
              <ResourcesListingSection />
            </CollapsibleCard>
          </CollapsibleGroup>

    </DashboardLayout>
  );
}
