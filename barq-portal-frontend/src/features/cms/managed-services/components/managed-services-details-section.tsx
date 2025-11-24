import SocServicesDetailsSection from "./soc-services-details-section";
import CybersecurityServicesDetailsSection from "./cybersecurity-services-details-section";
import GrcServicesDetailsSection from "./grc-services-details-section";

export default function ManagedServicesDetailsSection() {
  return (
    <div className="space-y-6">
      <SocServicesDetailsSection />
      <CybersecurityServicesDetailsSection />
      <GrcServicesDetailsSection />
    </div>
  );
}

